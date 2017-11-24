###############################################################################################################################
# Description : launch_instances contains the Library that Launches an Instance in OpenStack Environment.
# Developer   : Kiran Mandal
# Date        : 8th-May,2017
###############################################################################################################################
"""
*launch_instances*  contains the Library that Launches an Instance in OpenStack Environment.
              
"""

import paramiko
import time
import sys
import re
#arg1=imageName
#arg2=flavour
#arg3=instanceName

arg1=sys.argv[1]
arg2=sys.argv[2]
arg3=sys.argv[3]

def launch_instances(self,arg1,arg2,arg3):
    """
        Function Name        : launch_instances
        Function Description : Launches an Instance in OpenStack Environment.
        
        Inputs   : 
            arg1                    - Image (imageName) which is mandatory to launch an Instance.
            arg2                    - Flavour to be used to launch an Instance.
            arg3                    - Name of the Instance to be created.
        Outputs  : 
            an Instance is being created with desired Image ,Flavour and Instance Name.
    """
   
    host = '10.53.173.7'                                                    #server Ip Address
    username = 'root'                                                       #server User Name
    password = 'changem3'                                                   #server Password
    ssh_obj = paramiko.SSHClient()
    ssh_obj.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh_obj.connect(host, username=username, password=password, timeout=10)   #SSH to the server.
    print "Connected successfully to the Host :",host
    time.sleep(2)
    print "Launching Instance ",arg3," with Image ",arg1," and Flavour ",arg2
    # Creating Instances.
    stdin, stdout, stderr = ssh_obj.exec_command("source keystonerc_admin && nova boot --image "+arg1+" --flavor "+arg2+" --nic net-name=ext-mgmt "+arg3)
    time.sleep(5)
    errout = stderr.read()
    if stdout:
        data = stdout.read()
        print "Instance ",arg3," Launched Successfully"
        #print 'Failed to execute command'
        #print data
        #return errout
    else:
        # return stdout.read()
        #data = stdout.read()
        print 'Failed to Launch Instance ',arg3,' with Image ',arg1,' and Flavour ',arg2
        #print errout
    '''
    time.sleep(10)
    print "List of Instances:"
    stdin, stdout1, stderr1 = ssh_obj.exec_command("source keystonerc_admin && nova list")   
    time.sleep(5)
    errout = stderr1.read()
    if stdout1:
        print stdout1.read()
        
        #return errout
    else:
        # return stdout.read()
        print errout 
    attaching_ip_address(1,arg3)
    '''
        
    stdin, stdout, stderr = ssh_obj.exec_command("source keystonerc_admin && nova list")
    time.sleep(5)
    errout = stderr.read()
    if stdout:
        data = stdout.read()
        print "Instances List"
        #print 'Failed to execute command'
        #print data
        #return errout
    else:
        # return stdout.read()
        #data = stdout.read()
        print 'Failed to display Instances list'
        #print errout
    
    if arg3 in data:
        items=re.findall((arg3+".*$"),data,re.MULTILINE)
    for ip in items:
        #print ip
        ip=ip.split('|')
        #print ip[0]
        #print ip[-2]
        ext_mgmtIP=ip[-2]
        ext_mgmtIP=ext_mgmtIP.split('=')
        ext_mgmtIP=(ext_mgmtIP[-1]).split(" ")
        ext_mgmtIP=str(ext_mgmtIP[0])
        #Copying the Ip address to a file in the server.
        stdin, stdout, stderr = ssh_obj.exec_command("source keystonerc_admin && echo "+"'"+arg3+" "+ext_mgmtIP+"'"+" >>robot_input_openstack.txt")
        print "IP address ",ext_mgmtIP,"is copied to robot_input_openstack.txt "
    
    
    ssh_obj.close()
    
'''def attaching_ip_address(self,arg3):
    """
        Function Name        : attaching_ip_address
        Function Description : Attetches a floating Ip to the Instance, which makes the Instance Pingable from putty.
        
        Inputs   : 
            arg3                    - Name of the Instance to be created.
        Outputs  : 
            A Floating Ip is attatched with the Instance,which make the Instance pingable from putty.
            The Ip address is parsed and copied in a file 'robot_input_openstack.txt'.
    """
    
    host = '10.53.173.7'
    username = 'root'
    password = 'changem3'
    ssh_obj = paramiko.SSHClient()
    ssh_obj.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh_obj.connect(host, username=username, password=password, timeout=10)
    print "Generating a floating Ip From DHCP pool"
    # Getting the Floating Ip address From the DHCP pool.
    stdin, stdout1, stderr1 = ssh_obj.exec_command("source keystonerc_admin && nova floating-ip-create ext-mgmt")
    time.sleep(5)
    errout = stderr1.read()
    if stdout1:
        data=stdout1.read()
        #print data
        print "Ip Address is fetched successfully from DHCP pool"
        #print errout
        #return errout
    else:
        # return stdout.read()
        #data = stdout1.read()
        print "Could not fetch IP Address from DHCP pool"
        #print errout 
    #parsing the IP address from output of the previous cli Command.
    ip=data.split('IP')
    ip=str(ip)
    ip=ip.split('|')
    ip=ip[8].split(' ')
    ip=str(ip)
    ip=ip.split(', ')
    ip=str(ip[1])
    #Copying the Ip address to a file in the server.
    stdin, stdout, stderr = ssh_obj.exec_command("source keystonerc_admin && echo "+"'"+arg3+" "+ip+"'"+" >>robot_input_openstack.txt")
    print "Associating the Instance with floating IP Address: ",ip
    # Associating the IP address to the instances which will make Instance pingable from outside (putty). 
    stdin, stdout3, stderr3 = ssh_obj.exec_command("source keystonerc_admin && nova floating-ip-associate "+arg3+" "+ip)
    time.sleep(5)
    errout = stderr3.read()
    if stdout3:
        #print stdout3.read()
        print "Floating IP ",ip," is associated with the Instance ",arg3," successfully."
        #print errout
        #return errout
    else:
        # return stdout.read()
        #data = stdout3.read()
        print "Failed To associate ",ip," with the Instance ",arg3
        #print errout
    
    print "Floating Ip list"
    stdin, stdout2, stderr2 = ssh_obj.exec_command("source keystonerc_admin && nova floating-ip-list")
    time.sleep(5)
    errout = stderr2.read()
    if stdout2:
        print stdout2.read()
        #print errout
        #return errout
    else:
        # return stdout.read()
        #data = stdout2.read()
        print errout
    
    
    ssh_obj.close()
    '''
#launch_instances(1,arg1,arg2,arg3)
#attaching_ip_address(1,arg3)
if __name__ == "__main__":
    arg1=sys.argv[1]
    arg2=sys.argv[2]
    arg3=sys.argv[3]
    print launch_instances(1,arg1,arg2,arg3)