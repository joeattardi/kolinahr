# Ansible playbook for Fedora 25+

## Prerequisites
* A Fedora 25 or later physical or virtual machine with access to the Internet

## Setup of the playbook
Create a new file named `kolinahr-play.yml` in the same directory as this
README.md file with the following contents:

```
---
- hosts: all
  roles:
    - kolinahr_deployment
  vars:
    kolinahr_commitish: <REPLACE WITH GIT COMMIT OR TAG>
    KOLINAHR_PORT: <REPLACE WITH INTERNAL PORT, MUST BE > 1024)
    MONGODB_URI: mongodb://127.0.0.1/kolinahr <REPLACE IF USING REMOTE MONGODB>
    OPENID_CONNECT_AUTHORIZATION_URL: <ASK YOUR OPENIDCONNECT ADMIN>
    OPENID_CONNECT_TOKEN_URL: <ASK YOUR OPENIDCONNECT ADMIN>
    OPENID_CONNECT_USER_INFO_URL: <ASK YOUR OPENIDCONNECT ADMIN>
    OPENID_CONNECT_CLIENT_ID: <ASK YOUR OPENIDCONNECT ADMIN>
    OPENID_CONNECT_CLIENT_SECRET: <ASK YOUR OPENIDCONNECT ADMIN>
    OPENID_CONNECT_CALLBACK_URL: https://{{ inventory_hostname }}/auth/callback
    JWT_SECRET: <ASK YOUR OPENIDCONNECT ADMIN>

```

## Running the playbook

```
ansible-playbook -i hostname.domain.example, kolinahr-play.yml
```

(Note: if there is only one hostname in the -i argument, the trailing comma is
NOT OPTIONAL)


## First-time addendum

The first time this is run, it will not produce certificates for use with SSL.
This is due to certbot setup requiring manual intervention. SSH into the
system and run the following commands (substituting the correct hostname):

```
setenforce 0
/usr/bin/certbot certonly --manual-public-ip-logging-ok --webroot -w /srv/web/acme-challenge/ -d hostname.example.com
setenforce 1
systemctl restart nginx.service
```

