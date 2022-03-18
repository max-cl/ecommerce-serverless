# ecommerce-serverless

-   sam build
-   sam deploy --stack-name ecommerce-app --capabilities CAPABILITY_IAM --parameter-overrides 'MongoDbUsername=<DB-Username> MongoDbPassword=<DB-Password> MongoDbDb=<DB-Name> MongoDbCollection=<DB-Name-Collection> Stage=Dev' --guided

### DELETE STACK

-   sam delete ecommerce-app

### Template Validation

-   sam validate
