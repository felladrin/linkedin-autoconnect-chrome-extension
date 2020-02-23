FROM mcr.microsoft.com/vscode/devcontainers/base:ubuntu-18.04

ENV DEBIAN_FRONTEND=noninteractive

# Node.js major-version to be installed.
ARG NODE_VERSION=12

# https://help.github.com/en/github/authenticating-to-github/githubs-ssh-key-fingerprints
ARG GITHUB_FINGERPRINT=SHA256:nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8

# Install Node.js and other packages.
RUN curl -sL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash - \
  && apt-get install -y \
  nodejs \
  build-essential \
  # Install global Node.js modules.
  && npm install -g \
  npm \
  # Clean up.
  && apt-get autoremove -y \
  && apt-get clean -y \
  && rm -rf /var/lib/apt/lists/*

# Use "vscode" user from Microsoft base image.
USER vscode

# Create the folder for storing vs-code extensions.
RUN mkdir -p ~/.vscode-server/extensions \
  # Add GitHub to known hosts if it matches the fingerprint.
  && mkdir -p ~/.ssh \
  && ssh-keyscan -H github.com > /tmp/keyscan-result \
  && if ssh-keygen -lf /tmp/keyscan-result | grep -q ${GITHUB_FINGERPRINT}; then cat /tmp/keyscan-result >> ~/.ssh/known_hosts; fi \
  && rm /tmp/keyscan-result

ENV DEBIAN_FRONTEND=dialog
