import paramiko
import time
import sys

arg=sys.argv[1]
def offBoarding(self,arg):
    host = '10.53.173.7'
    username = 'root'
    password = 'changem3'
    ssh_obj = paramiko.SSHClient()
    ssh_obj.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh_obj.connect(host, username=username, password=password, timeout=10)
    print "List of Instances"
    stdin, stdout, stderr = ssh_obj.exec_command("source keystonerc_admin && nova list")
    
    time.sleep(5)
    errout = stderr.read()
    if stdout:
        data=stdout.read()
        print data
        #print errout
        #return errout
    else:
        # return stdout.read()
        #data = stdout1.read()
        print errout 
    print "Deleting Instances : ",arg
    stdin, stdout1, stderr1 = ssh_obj.exec_command("source keystonerc_admin && openstack server delete "+arg)
    
    time.sleep(5)
    errout = stderr1.read()
    if stdout:
        data=stdout1.read()
        print data
        #print errout
        #return errout
    else:
        # return stdout.read()
        #data = stdout1.read()
        print errout 
    print "List of Instances after deleting ;",arg  
    stdin, stdout2, stderr2 = ssh_obj.exec_command("source keystonerc_admin && nova list")
    
    time.sleep(5)
    errout = stderr2.read()
    if stdout:
        data=stdout2.read()
        print data
        #print errout
        #return errout
    else:
        # return stdout.read()
        #data = stdout1.read()
        print errout 
        
    ssh_obj.close()
    
offBoarding(1,arg)