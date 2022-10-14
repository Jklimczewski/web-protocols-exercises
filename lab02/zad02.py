import paramiko

command = "ls"

ssh = paramiko.SSHClient()
ssh.load_system_host_keys()
ssh.connect("sigma.ug.edu.pl")

# name = input("Which file: ")
name = "/home/jklimczewski/test.txt"
stdin, stdout, stderr = ssh.exec_command(command + " " + name)
if not stderr.readline():
    # lines = stdout.readline()
    # print(lines)
    stdin2, stdout2, stderr2 = ssh.exec_command("cat" + " " + name)
    print(stdout2.readline())
else:
    print("err")

ssh.close()