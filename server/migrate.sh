#!/bin/sh

if [ "DB_SHOULD_CREATE_DATABASE" = true ]; then
  USE_CERT_COMMAND=""
  if [ "$DB_SSH" = true ]; then
    USE_CERT_COMMAND="--set=sslcert=$NODE_EXTRA_CA_CERTS"
    echo "Secure conection setup detected"
  fi


  if PGPASSWORD="$DB_PASSWORD" psql $USE_CERT_COMMAND -U $DB_NOTIFICATION -p $DB_PORT -h $DB_HOST -lqt | cut -d \| -f 1 | grep -qw $DB_NAME; then
    echo "Database $DB_NAME already exists, skipping creation..."
  else
    echo "Database $DB_NAME doesn't exist, creating now..."
    PGPASSWORD="$DB_PASSWORD" psql $USE_CERT_COMMAND -U "$DB_NOTIFICATION" -p $DB_PORT -h "$DB_HOST" -c "CREATE DATABASE "$DB_NAME" WITH OWNER $DB_NOTIFICATION;"
    # npx --quiet sequelize-cli db:create
    
    echo "Granting privilegies"
    PGPASSWORD="$DB_PASSWORD" psql $USE_CERT_COMMAND -U "$DB_NOTIFICATION" -p $DB_PORT -h "$DB_HOST" -c "GRANT ALL PRIVILEGES ON DATABASE "$DB_NAME" TO $DB_NOTIFICATION;"
  fi
fi

# Migrations
echo "Executing migrations.."
npx knex migrate:latest