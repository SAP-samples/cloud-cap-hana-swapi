# See here for image contents: https://github.com/devcontainers/images/tree/main/src/javascript-node

# [Choice] Node.js LTS variants include 22-bookworm and 24-bookworm.
ARG VARIANT="24-bookworm"
FROM mcr.microsoft.com/devcontainers/javascript-node:1-${VARIANT}

# Prepare for apt-based install of Cloud Foundry CLI by adding Cloud Foundry Foundation public key & package repository
# (see https://docs.cloudfoundry.org/cf-cli/install-go-cli.html#pkg-linux).
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends ca-certificates curl gnupg \
    && install -m 0755 -d /etc/apt/keyrings \
    && curl -fsSL https://packages.cloudfoundry.org/debian/cli.cloudfoundry.org.key \
        | gpg --dearmor -o /etc/apt/keyrings/cloudfoundry-cli.gpg \
    && chmod a+r /etc/apt/keyrings/cloudfoundry-cli.gpg \
    && echo "deb [signed-by=/etc/apt/keyrings/cloudfoundry-cli.gpg] https://packages.cloudfoundry.org/debian stable main" \
        > /etc/apt/sources.list.d/cloudfoundry-cli.list \
    && apt-get update \
    && apt-get -y install --no-install-recommends sqlite cf-cli \
    && rm -rf /var/lib/apt/lists/*

# Install global node modules for SAP CAP and frontend development.
RUN su node -c "npm install -g @ui5/cli @sap/cds-dk yo @sapui5/generator-sapui5-templates @sap/generator-base-mta-module @sap/generator-cap-project @sap/generator-fiori @sap/generator-hdb-project mbt typescript hana-cli"
