import re
file_name='D:\\Automation_demo\\back_tar\\scripts\\demo.robot'
file=open(file_name,'r')
f=list(file)
for i in range(0,len(f)):
    if re.search('Test Cases',f[i]):
        index1=i
    if(re.search('Keywords',f[i])):
        index2=i
testcases=[]
testcases_file=open('testcases.txt','w+')
for i in range(index1+1,index2):
    line1=f[i]
    if re.match(r'[^ \t].*', line1):
        line2=line1.strip()
        testcases_file.write(line2)
        testcases_file.write('\n')
        #print line1

testcases_file.close()
file.close()

    
