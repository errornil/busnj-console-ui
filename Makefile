install:
	@npm install

test:
	@npm run test

run:
	@npm start

build:
	@npm run build

build-docker:
	@docker build --tag busnj-console-ui:latest .;

run-docker:
	@docker run --name busnj-console-ui \
		--rm \
		--network ${NETWORK} \
		busnj-console-ui:latest;
