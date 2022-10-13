import paramiko

command = "ls"

ssh = paramiko.SSHClient()
ssh.load_system_host_keys()
ssh.connect("sigma.ug.edu.pl")

name = input("Which file: ")

stdin, stdout, stderr = ssh.exec_command(command)
lines = stdout.readlines()
print(lines)
print(lines[12])
for nazwa in lines:
    if str(name) == str(nazwa):
        print(nazwa)
        print("essa")
    else:
        print(nazwa)
        print(name)
        print("no")
ssh.close()