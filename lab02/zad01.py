import paramiko

command = "who"

ssh = paramiko.SSHClient()
ssh.load_system_host_keys()
ssh.connect("sigma.ug.edu.pl")

stdin, stdout, stderr = ssh.exec_command(command)
lines = stdout.readlines()
print(len(lines))
ssh.close()