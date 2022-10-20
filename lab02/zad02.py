import paramiko

command = "cat"

ssh = paramiko.SSHClient()
ssh.load_system_host_keys()
ssh.connect("sigma.ug.edu.pl")

# name = input("Which file: ")
name = "/home/jklimczewski/test.txt"
stdin, stdout, stderr = ssh.exec_command(command + " " + name)
lines = [line.rstrip() for line in stdout]
if lines:
    for line in lines:
        print(line)
else:
    print("Zła ścieżka pliku!")

if ssh is not None:
    ssh.close()
    del ssh, stdin, stdout, stderr
