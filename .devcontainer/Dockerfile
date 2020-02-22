FROM ubuntu:18.04

ENV DEBIAN_FRONTEND=noninteractive

# Copy of the "remoteUser" set in "devcontainer.json".
ARG REMOTE_USER=developer

# Node.js major-version to be installed.
ARG NODE_VERSION=12

# https://help.github.com/en/github/authenticating-to-github/githubs-ssh-key-fingerprints
ARG GITHUB_FINGERPRINT=SHA256:nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8

# Add a non-root user.
RUN groupadd --gid 1000 ${REMOTE_USER} \
  && useradd --uid 1000 --gid ${REMOTE_USER} --shell /bin/bash --create-home ${REMOTE_USER} \
  # Update system packages lists.
  && apt-get update \
  # Install required system packages.
  && apt-get -y install --no-install-recommends \
  ssh \
  git \
  curl \
  build-essential \
  ca-certificates \
  # Install Node.js
  && curl -sL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash - \
  && apt-get install -y nodejs \
  # Install global Node.js modules.
  && npm install -g \
  npm \
  # Add GitHub to known hosts if it matches the fingerprint.
  && ssh-keyscan -H github.com > keyscan-result \
  && if ssh-keygen -lf keyscan-result | grep -q ${GITHUB_FINGERPRINT}; then cat keyscan-result >> /etc/ssh/ssh_known_hosts; fi \
  && rm keyscan-result \
  # Create the folder for storing vs-code extensions.
  && mkdir -p /home/${REMOTE_USER}/.vscode-server/extensions \
  && chown -R ${REMOTE_USER} /home/${REMOTE_USER}/.vscode-server \
  # Clean up.
  && apt-get autoremove -y \
  && apt-get clean -y \
  && rm -rf /var/lib/apt/lists/*

ENV DEBIAN_FRONTEND=dialog
