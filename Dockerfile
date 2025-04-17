FROM node:23.11.0-bookwork

ENV S6_BEHAVIOUR_IF_STAGE2_FAILS=2

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

COPY rootfs/ /

RUN set -x && \

