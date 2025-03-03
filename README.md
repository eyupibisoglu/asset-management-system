## Project setup

```bash
docker-compose up
```

## Architecture
Services are developed with Nestjs. We have 6 services available. The services are as follows:

* auth: Handles user authentication and authorization.

* users: Provides REST CRUD operations for user management. Since the data structure is straightforward and no nested structure is expected, PostgreSQL (via Neon.tech) is used for this service.

* assets: Manages CRUD operations for assets and allows updating asset amounts. To ensure faster data retrieval and flexibility in the data structure, MongoDB (via MongoDB Atlas) is used for this service.

* assets-task: Queues and executes transactions between two assets based on a scheduled date and time. Redis is used to store temporary transaction data. Since this is temporary data, a Redis image was deployed using Docker instead of relying on an external service.

* wallets: Enables users to hold their assets. Similar to the assets service, this service also uses MongoDB.

* gateway: Acts as an API gateway, serving as a front layer for all the services. It is accessible on port 3000.

The system operates over TCP. Only the gateway is exposed externally via REST, while all other services are accessed through the gateway.

You can access the system's API Swagger documentation at http://localhost:3000/docs.

## Senario

1- There are currently 2 users in the system.

ibisoglueyup@gmail.com (Password: 123456)

ozkanbor@gmail.com (Password: 123456)
You can also create your own user via the documentation if you wish.

2- You can log in using the Auth service and use the services with your token.

3- Each of the above users has a wallet. The wallets contain unique address and network fields. If you try to add a wallet with the same address & network via the service, you will receive a response stating that the wallet already exists.

4- Each wallet has an asset. You can list all assets using the token. I did not put user restriction in order to make it easy to check.

5- Finally, you can initiate a transaction via the assets-task. from specifies the sender asset, and to specifies the recipient asset. The scheduledIsoTime parameter indicates when the transaction will be executed. Here, we utilize the delay feature of queue structures. By subtracting the current time from the given time and converting it to milliseconds, we obtain the delay data. When we provide this delay to the queue structure, the transaction is executed at the desired time. If we want to create a v2 of this feature, we can set up a structure that is regularly checked using cron jobs.

## Tests
The project follows a Jest-based test structure. Each module contains its own tests, including controller.spec.ts for controller tests and service.spec.ts for service tests. I have not been able to develop all test. You can check users service app.controller.spec.ts for an example.
