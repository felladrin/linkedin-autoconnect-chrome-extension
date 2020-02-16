FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:12

ARG GITHUB_FINGERPRINT=SHA256:nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8

RUN ssh-keyscan -H github.com > github-keyscan-result \
  && if ssh-keygen -lf github-keyscan-result | grep -q ${GITHUB_FINGERPRINT}; then cat github-keyscan-result >> /etc/ssh/ssh_known_hosts; fi \
  && rm github-keyscan-result
