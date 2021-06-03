
SET CONTAINER_NAME=leave_db_1
SET DATABASE_NAME=leave
SET BACKUP_LOCATION=C:/Users/Ahmad/Desktop/

SET TIMESTAMP=%date:~10,4%%date:~7,2%%date:~4,2%

docker exec -t %CONTAINER_NAME% mongodump --out=/data/db/%DATABASE_NAME%-backup-%TIMESTAMP% --db=%DATABASE_NAME%
docker cp %CONTAINER_NAME%:/data/db/%DATABASE_NAME%-backup-%TIMESTAMP% %BACKUP_LOCATION%