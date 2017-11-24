import paramiko
import sys
ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('10.53.173.7', username='root', password='changem3')

print "connected successfully!"
arg = sys.argv[1]
sftp = ssh.open_sftp()
print sftp
#sftp.put('shani.txt','/root/shani/shani/shani.txt' )
sftp.put(arg,'/root/images/' + arg)

#sftp.put(arg,'/root/images/' + arg)
#sftp.put(arg2,)

sftp.close()
print "copied successfully!"

ssh.close()
exit()
