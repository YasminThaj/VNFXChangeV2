import paramiko
import time
import sys

#arg1=imageName
#arg2=flavour
#arg3=instanceName

arg1=sys.argv[1]
arg2=sys.argv[2]
arg3=sys.argv[3]

def launch_instances(self,arg1,arg2,arg3):
    host = '10.53.173.7'
    username = 'root'
    password = 'changem3'
    ssh_obj = paramiko.SSHClient()
    ssh_obj.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh_obj.connect(host, username=username, password=password, timeout=10)
    
    stdin, stdout, stderr = ssh_obj.exec_command("source keystonerc_admin && nova boot --image "+arg1+" --flavor "+arg2+" --nic net-name=int-mgmt "+arg3)
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
    stdin, stdout1, stderr1 = ssh_obj.exec_command("source keystonerc_admin && nova list")   
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
    attaching_ip_address(1,arg3)
    ssh_obj.close()
    
def attaching_ip_address(self,arg3):
    host = '10.53.173.7'
    username = 'root'
    password = 'changem3'
    ssh_obj = paramiko.SSHClient()
    ssh_obj.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh_obj.connect(host, username=username, password=password, timeout=10)
    
    stdin, stdout1, stderr1 = ssh_obj.exec_command("source keystonerc_admin && nova floating-ip-create ext-mgmt")
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
        
    ip=stdout1.split('IP')
    ip=str(ip)
    ip=ip.split('|')
    ip=ip[8].split(' ')
    stdin, stdout, stderr = ssh_obj.exec_command("source keystonerc_admin && echo "+"'"+arg3+" "+ip+"'"+" >>robot_input_openstack.txt")
     
    stdin, stdout3, stderr3 = ssh_obj.exec_command("source keystonerc_admin && nova floating-ip-associate "+arg3+" "+ip)
    time.sleep(5)
    errout = stderr3.read()
    if errout:
        print 'Failed to execute command'
        print errout
        #return errout
    else:
        # return stdout.read()
        data = stdout3.read()
        print '%s' % data
    
    stdin, stdout2, stderr2 = ssh_obj.exec_command("source keystonerc_admin && nova floating-ip-list")
    time.sleep(5)
    errout = stderr2.read()
    if errout:
        print 'Failed to execute command'
        print errout
        #return errout
    else:
        # return stdout.read()
        data = stdout2.read()
        print '%s' % data

    ssh_obj.close()
launch_instances(1,arg1,arg2,arg3)