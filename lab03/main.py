import pysftp

with pysftp.Connection('sigma.ug.edu.pl') as sftp:
    print("Conntection succesfull")

    remoteFilePath = '/home/jklimczewski/plik.txt'
    localFilePath = '/home/jklimczewski/jklimczewski'
    sftp.get(remoteFilePath, localFilePath)