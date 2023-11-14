#!/bin/bash
set -e

echo "CREATE DATABASE db_crud;" | mysql -u root -p
echo "CREATE DATABASE db_crud2;" | mysql -u root -p