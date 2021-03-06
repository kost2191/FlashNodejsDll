import socket
import sys

def send_string(socket, data):
  bytes_to_send = len(data)
  while bytes_to_send > 0:
    sent_bytes = socket.send(data, bytes_to_send)
    if sent_bytes == -1:
      return False;
    bytes_to_send -= sent_bytes
  return True
    
def recv_line(socket):
  EOL = "\r\n"
  nbytes = 1
  buffer = socket.recv(nbytes)

  while not EOL in buffer:
    buffer += socket.recv(nbytes)
  result = buffer[:-2]
  return (result, len(result))

ROOTDIR = "./www"

def process_connetion(sock, address):

  request, length = recv_line(sock)
  print 'Got request from %s:%d "%s" \n' 
	% (address[0], address[1], request)
  
  if " HTTP/" in request:
    file_path = None
    if "GET " in request:
      file_path = request[4:-9]
    if "HEAD " in request:
      file_path = request[5:-9]
    
    if file_path:
      if file_path == '/':
        file_path = '/index.html'
      resource = ROOTDIR
      resource += file_path
      try:
        f = open(resource, 'rb')
        print " 200 OK\n"
        send_string(sock,"HTTP/1.0 200 OK\r\n")
        send_string(sock,"Content-Type: text/html; charset=UTF-8\r\n")
        send_string(sock, "Set-Cookie: name=value\r\n") 
			# install cookies
        send_string(sock, "Server: Nano PyHttpd\r\n\r\n")
        if "GET " in request:
          file_content = f.read()
          sock.send(file_content, 10485760) 
		# problem with sending huge files
   
        f.close()
      except IOError:
        print " 404 Not found\n"
        send_string(sock, "HTTP/1.0 404 NOT FOUND\r\n")
        send_string(sock, "Server: Nano PyHttpd\r\n\r\n")
        send_string(sock, "404 Not Found")
        send_string(sock, "URL not found\r\n")
        
    else:
      print "\tUnknown request!\n" # if type of request is unknown
  else:
    print " NOT HTTP!\n"
  sock.shutdown(socket.SHUT_RD) # closing the socket
  sock.close()

def main():
  host = ''
  port = 8080
  backlog = 5
  s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
  s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
  s.bind((host,port))
  s.listen(backlog)
  while 1:
    client, address = s.accept()
    process_connetion(client, address)
    
if __name__ == '__main__':
  main()
