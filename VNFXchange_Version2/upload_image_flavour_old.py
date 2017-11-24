import paramiko
import time
import sys,os
import random

#arg=localhost image path with image name
#arg1=imageName instances

arg1=sys.argv[1]
arg2=sys.argv[2]


def upload_image(self,arg1):
    host = '10.53.173.7'
    username = 'root'
    password = 'changem3'
    arg3=str(arg1).split('\\')
    arg4=arg3[-1]
    arg5=arg1.replace(arg4,"")
    os.chdir(arg5)
   
    ssh_obj = paramiko.SSHClient()
    ssh_obj.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh_obj.connect(host, username=username, password=password, timeout=10)
    
    #copying from local machine to server 
    sftp = ssh_obj.open_sftp()
    print sftp
    print "connected successfully!"
    arg2=str(arg1).split('\\')
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
    
    
def create_Flavour(self,arg2):
    host = '10.53.173.7'
    username = 'root'
    password = 'changem3'
    ssh_obj = paramiko.SSHClient()
    ssh_obj.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh_obj.connect(host, username=username, password=password, timeout=10)
   
    iD=str(random.randint(10,500))
   
    file=open(arg2, 'r')
    orgFile=file.read()
    filename=file.name
    filename=filename.split("\\")
    FlavourName=filename[-1].split(".")[0]
    
    #print orgFile
    #ram
    file1=orgFile.split("\n")
    file2=file1[0].split(":")
    ram=file2[1]
    #disk
    file1=orgFile.split("\n")
    file2=file1[1].split(":")
    disk=file2[1]
    #vcpus
    file1=orgFile.split("\n")
    file2=file1[2].split(":")
    vcpus=file2[1]
    
    stdin, stdout, stderr = ssh_obj.exec_command("source keystonerc_admin && nova flavor-create "+FlavourName+" "+iD+" "+ram+" "+disk+" "+vcpus)
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
        
    stdin, stdout1, stderr1 = ssh_obj.exec_command("source keystonerc_admin && openstack flavor list")
    time.sleep(5)
    errout = stderr1.read()
    if errout:
        print 'Failed to execute command'
        print errout
        #return errout
    else:
        # return stdout.read()
        data = stdout1.read()
        print '%s' % data
        
    ssh_obj.close()

upload_image(1,arg1) 
create_Flavour(1,arg2)     
#upload_image(1,'D:\\verizon\\vyos-1.1.0-amd64','vyos-1.1.0-amd64')  