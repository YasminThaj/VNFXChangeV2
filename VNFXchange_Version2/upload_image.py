import paramiko
import time
import sys,os

#arg=localhost image path with image name
#arg1=imageName instances

arg=sys.argv[1]


def upload_image(self,arg):
    host = '10.53.173.7'
    username = 'root'
    password = 'changem3'
    arg3=str(arg).split('\\')
    arg4=arg3[-1]
    arg5=arg.replace(arg4,"")
    os.chdir(arg5)
   
    ssh_obj = paramiko.SSHClient()
    ssh_obj.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh_obj.connect(host, username=username, password=password, timeout=10)
    
    #copying from local machine to server 
    sftp = ssh_obj.open_sftp()
    print sftp
    print "connected successfully!"
    arg2=str(arg).split('\\')
    arg2=arg2[-1]
    print arg2
    sftp.put(arg2,"/images/" + arg2)
    sftp.close()
    print "copied successfully!"
    
    time.sleep(2)
   
    stdin, stdout, stderr = ssh_obj.exec_command("source keystonerc_admin && glance image-create --name "+'"'+arg2+'"'+" --disk-format=qcow2 --container-format bare --file /images/"+arg2+ " --progress")

    time.sleep(5)
    errout = stderr.read()
    if errout:
        print 'Failed to execute command'
        print errout
        #return errout
    else:
        # return stdout.read()
        data = stdout.read()
        print '%s' % data
        
    stdin, stdout, stderr = ssh_obj.exec_command("source keystonerc_admin && glance image-list")   
    time.sleep(2)
    errout1 = stderr.read()
    if errout1:
        print 'Failed to execute command'
        print errout1
        #return errout
    else:
        # return stdout.read()
        data1 = stdout.read()
        print '%s' % data1 
    exit()
    
    ssh_obj.close()

upload_image(1,arg)      
#upload_image(1,'D:\\verizon\\vyos-1.1.0-amd64','vyos-1.1.0-amd64')  