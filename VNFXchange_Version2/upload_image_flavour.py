###############################################################################################################################
# Description : upload_image_flavour contains the Library that Copies an Image from local Host to the server and then to Glance,
#               in Openstack Environment,as well as creates a Flavour.
# Developer   : Kiran Mandal
# Date        : 8th-May,2017
###############################################################################################################################
"""
*upload_image_flavour*  contains the Library that Copies an Image from local Host to the server and then to Glance,in Openstack Environment,
as well as creates a Flavour.
              
"""


import paramiko
import time
import sys,os
import random

#arg=localhost image path with image name
#arg1=imageName instances

def upload_image(arg1):
    """
        Function Name        : upload_image
        Function Description : Copies an Image ('.img' , '.qcow2' , '.iso') from Local Host to server and then copies it to Glance.
        
        Inputs   : 
            arg1                    - Complete Image Path in the local Host.
        Outputs  : 
            Images with extension '.img' , '.qcow2' , or '.iso' are copied from local host to the server,
            Then From the server Image is copied to glance.
    """
    
    host = '10.53.173.7'                                             #server Ip Address
    username = 'root'                                                #server User Name
    password = 'changem3'                                            #server Password
    arg3=str(arg1).split('\\')                     
    arg4=arg3[-1]
    #Splitting the complete Image Path to get the Complete Image name.
    arg5=arg1.replace(arg4,"")                                       
    os.chdir(arg5)
    
    
    #Splitting the Image Name and the Entension.
    filename, file_extension = os.path.splitext(arg1)                
    # Matching the Extension With Correct Image Format.
    list1=['.img','.qcow2','.iso']
    print list1
    if (list1[0].strip()==file_extension or list1[1].strip()==file_extension or list1[2].strip()==file_extension):
        ssh_obj = paramiko.SSHClient()                               
        ssh_obj.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        ssh_obj.connect(host, username=username, password=password, timeout=10) #SSH to the server.
        print "Connected successfully to the Host :",host
        #copying from local machine to server 
        sftp = ssh_obj.open_sftp()
        #print sftp
        print "copying Image from local host to Server"
        arg2=str(arg1).split('\\')
        arg2=arg2[-1]
        print "uploading the image "+"'"+arg2+"'"+" please wait....."
        #Image Copied local host to the server in /image directory.
        sftp.put(arg2,"/images/" + arg2)                                       
        sftp.close()
        print "Uploaded successfully!!!"
        print "Image Copied to the server Successfully"
    
        time.sleep(2)
        print "Copying Image to Glance"
        #Image is copied from server to Glance.
        stdin, stdout, stderr = ssh_obj.exec_command("source keystonerc_admin && glance image-create --name "+'"'+arg2+'"'+" --disk-format=qcow2 --container-format bare --file /images/"+arg2+ " --progress")
    
        time.sleep(5)
        errout = stderr.read()
        if errout:
            print 'Failed to copy Image to Glance'
            #print errout
            #return errout
        else:
            # return stdout.read()
            data = stdout.read()
            #print '%s' % data
            print "Image copied to Glance successfully"
    else:
        print"Incorrect Image Format . Please Select Image with '.img' or '.qcow2' or '.iso' Extentions."
        sys.exit()
        
    '''   
    stdin, stdout, stderr = ssh_obj.exec_command("source keystonerc_admin && glance image-list")   
    time.sleep(2)
    errout1 = stderr.read()
    if errout1:
        #print 'Failed to Display the Image List'
        #print errout1
        #return errout
        data2=errout1
    else:
        # return stdout.read()
        data1 = stdout.read()
        #print "List of Images In Glance:"
        #print '%s' % data1 
   
    #exit()
    '''  
    ssh_obj.close()

  
def create_Flavour(arg2):
    """
        Function Name        : create_Flavour
        Function Description : Creates a Flavour which is necessary to spin up an Instance In OpenStack Environment.
        
        Inputs   : 
            arg2                    - Complete Flavour File Path in the local Host.'Flavour file contains values of - Ram ,Disk and Vcpus.'
        Outputs  : 
             Creates a Flavour As per the Guidance of the Flavour File.
    """
    
    host = '10.53.173.7'
    username = 'root'
    password = 'changem3'
    print "creating  Flavour :", arg2
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
        print 'Failed to create Flavour :',arg2
        #print errout
        #return errout
    else:
        # return stdout.read()
        data = stdout.read()
        print "Flavour ",arg2," Created successfully"
        sys.exit()
        
        #print '%s' % data
      
    stdin, stdout1, stderr1 = ssh_obj.exec_command("source keystonerc_admin && openstack flavor list")
    time.sleep(5)
    errout = stderr1.read()
    if errout:
        print 'Failed to display Flavours List'
        #print errout
        #return errout
    else:
        # return stdout.read()
        data = stdout1.read()
        print "List of Flavours: "
        print '%s' % data
      
    ssh_obj.close()
  

if __name__ == "__main__":
    arg1=sys.argv[1]
    arg2=sys.argv[2]
    print upload_image(arg1) 
    print create_Flavour(arg2)     
    #upload_image(1,'D:\\verizon\\vyos-1.1.0-amd64','vyos-1.1.0-amd64')  