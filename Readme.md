# File Manager

Run script `npm run start -- --username=your_username`

## Navigation & working directory (nwd)

- Go upper from current directory: `up`;
- Go to dedicated folder from current directory: `cd ./folder`, `cd "d:/Document and Settings"`;
- List all files and folder in current directory: `ls`.

## Basic operations with files

- Read file and print it's content in console: `cat file.txt`, `cat d:/file.txt`;
- Create empty file in current working directory: `add file.txt`, `add "file with space.txt"`;
- Rename file: `rn d:/file.txt newFile.txt`;
- Copy file: `cp d:/file.txt c:/users/user`, `cp file.txt c:/users/user`;
- Move file: `mv d:/file.txt c:/users/user`, `mv file.txt ./folder`;
- Delete file: `rm d:/file.txt`, `rm file.txt`.

## Operating system info

- Get EOL (default system End-Of-Line): `os --EOL`;
- Get host machine CPUs info: `os --cpus`;
- Get home directory: `os --homedir`;
- Get current system user name: `os --username`;
- Get CPU architecture for which Node.js binary has compiled^ `os --architecture`.

## Hash calculation

- Calculate hash for file and print it into console: `hash d:/file.txt`, `hash file.txt`.

## Compress and decompress operations

- Compress file (using Brotli algorithm): `compress d:/file.txt file.br`;
- Decompress file (using Brotli algorithm): `decompress file.br d:/file.txt`.
