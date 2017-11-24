###############################################################################################################################
# Description : offboarding contains the Library that Deletes an Instance in OpenStack Environment.
# Developer   : Kiran Mandal
# Date        : 8th-May,2017
###############################################################################################################################
"""
*launch_instances*  contains the Library that Deletes an Instance in OpenStack Environment..
              
"""

import paramiko
import time
import sys


def offBoarding(self,arg):
    """
        Function Name        : offBoarding
        Function Description : Launches an Instance in OpenStack Environment.
        
        Inputs   : 
            arg                    - Instance Name which needed to be offBoarded (deleted).
            
        Outputs  : 
            an Instance is being OffBoarded successfully from the server.
    """
    
    host = '10.53.173.7'
    username = 'root'
    password = 'changem3'
    ssh_obj = paramiko.SSHClient()
    ssh_obj.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh_obj.connect(host, username=username, password=password, timeout=10)  #SSH to the server.
    print "Connected successfully to the Host :",host
    print "List of Instances:"
    
    # List of Instance Present
    stdin, stdout, stderr = ssh_obj.exec_command("source keystonerc_admin && nova list")
    data=stdout.read()
    '''
    time.sleep(3)
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
    '''
    print "Finding Instance ","'",arg,"'"," in the Instances List.."
    if arg in data:
        print "Instance ",arg," is found"
        print "Deleting Instances : ",arg
        # Deleting the Instance.
        stdin, stdout1, stderr1 = ssh_obj.exec_command("source keystonerc_admin && openstack server delete "+arg)
    
        time.sleep(5)
        errout = stderr1.read()
        if stdout:
            data=stdout1.read()
            #print data
            print "Instance ",arg," Deleted Successfully"
        #print errout
        #return errout
        else:
        # return stdout.read()
            data = stdout1.read()
            #print errout 
    else:
        print arg,"is not present in the Instacnce List."
        exit()
    '''
    print "List of Instances after deleting :",arg  
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
    '''   
    ssh_obj.close()

if __name__ == "__main__":
    arg=sys.argv[1]    
    print offBoarding(1,arg)