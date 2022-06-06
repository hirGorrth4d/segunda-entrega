export default {
    fileSystem : {
        path: './db'
    },
    mongodb: {
        connection: 'mongodb://localhost/ecommerce',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            serverSelectionTimeoutMS: 5000,
        }
    },
    firebase: {
        "type": "service_account",
        "project_id": "ecommerce-data-d1f70",
        "private_key_id": "51e34f9895ac0c552bd4c3af82310bf7e07d0ee5",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC2tf/pZNhomOGM\nUbw8dZQsh21TQ2zpi/FK8l3q2sBjQ0tYQbQuoFm+hDJ3Jz+dSnQue9qXUEOuWJZr\njAAOxuJpBePNVHRdVeUMe1kF19JUAJRLkekQKnIebjIoLFFU5DIApOSeQy1llYnc\naE0Ko8YavUyg7JfnqL7eSKXvJuOTVO7mPkZjf1g1rllW1zw1ZH6mym/tJ6UefZwB\nn618SA/Mw1DRYrxUVwmBxKAb0DCCixOfn1MINP7p8oPCnTdLZt3zY0ORda1+qdAe\nLgxDCza+521oQ9RRKRY/cWfe4vaoyU8uO4afEO/eVKuzb4CcFum9EI673NVpmsez\nW8DuSG6nAgMBAAECggEALNKSQOIF+wcCUgedK6HWo2PnzITee57ip3W015ApoVBZ\ndAHOX5/j1EqfDL8aqo4g2WR1+CfvKp697A1Q2E8vLP+OZolg8KLJSZoa+UV8ajIo\nLy/Q4q/fBhsXf+Z7X12J7MGG+lJVmTWpt+H4gHMz/sxQt6vDCkhJ5sMgvf4m1zYT\nvpb76zR/D+SRYwQ50D4oNQaONkM7JGH/HVwVRspy2WvvTZnHyv7nHA22ml4jqoVf\nRFI1Df8EefzHz6+MID4pUKJtCkV5aAMqhFz3Fqk89t25O2C/vHdi6X3/TAuQrfMo\nVgAWuLw0dH5u9JxdGIflxUiX6YosBwMfUBy9ufv4jQKBgQD/XPlt1c/75MVoDC4m\nrDP4MzzdVEuH9BiOAXKnjKWWGB0SThrZ66NcYc+Yn7Be4nkDmM7yOoVHmE/sqXi4\n/FGMizx5zR/I6LEu4IKddBU1RU9p3ZCziPWMluZ0Bz/2MSm/gpOf6ZG29r23H1o9\n8+xeGIASd3WXpXISNJbKuJBTlQKBgQC3KqTD4e8s3BTsztmzCZmb55AZwNvmhkJy\nRPGQpGlTc/lfujSWa68tJ0TAqJvjq9pV/yGwtYvRgw49cew7oJR2Eo/um/yaQhCB\nd2Hk0Z1orWt1x2HQ6t0L7uxfO8UY2lkCp7E4c6xH7sPDXjwZ1x1pioZS0V39MCdN\ndZjRcsOqSwKBgHI4ohDw7EDdiTcLC7GcoPpJ4NWXGNnM4xbRqvkqvf4u9wHzEaub\n7Mwrq/G2q+slHb/wH9DVQDxP8qAHBcqogcl9liVdDPSOsIIpRgMrozjasbTGuCy1\n/C9QZ/BKNd/nCadxvppunRDbuOwqB/FiI73K865O5LhZ9nYSM8ilWVkpAoGANygR\nO6dSlaikaHcVmVNfvVHq08Z+sZlmcvCN6aeIzAeVZZ017sH4m1lC290qLFH4yoKs\ni4Dv3KRhamFe6Mm/Sxrl2s2AMJeKTuI7SWNRyk7GmE31B6th6xEEft0JyiUePq1u\nsXgrvfGJY9CBuqpLghejwVaovfB9NVcfMJsljqcCgYEAqWTISuK3CPmmUZYQARsL\nHkTFFwTJGeoYtUqbpHwO+GBTsiVGu9PZeCwMQTEqWjpixJW+0sqh+2aSRNtsP2gP\nD4oNUYR/8UW6XlBCSypNtugFzrSOmUaAgF5Ut4h1Q0uHlt09ERoMeG4ZrN+Br7p7\n9PsFPGap8zA0VSSuneTgU5E=\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-y1e0k@ecommerce-data-d1f70.iam.gserviceaccount.com",
        "client_id": "100222919619840999803",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-y1e0k%40ecommerce-data-d1f70.iam.gserviceaccount.com"
    },
    sqlite3 : {
        client: 'sqlite3',
        connection: {
            filename: './db/ecommerce.sqlite'
        },
        useNullAsDefault: true
    },
    mysql: {
        client: 'mysql',
        connection: {
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'ecommerce'
        }
    }
}