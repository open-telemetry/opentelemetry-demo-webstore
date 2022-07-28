# build context will only work from ../../docker-compose.yml
FROM rust:1.61-alpine as builder
RUN apk update
RUN apk add --no-cache ca-certificates git protoc cmake clang clang-dev make gcc g++ libc-dev linux-headers
WORKDIR /app/

# build app
COPY ./src/shippingservice/ /app/
COPY ./pb/ /app/proto/
RUN cargo build -r --features="dockerproto"

FROM alpine as release
RUN apk add --no-cache ca-certificates
RUN GRPC_HEALTH_PROBE_VERSION=v0.4.7 && \
    wget -qO/bin/grpc_health_probe https://github.com/grpc-ecosystem/grpc-health-probe/releases/download/${GRPC_HEALTH_PROBE_VERSION}/grpc_health_probe-linux-amd64 && \
    chmod +x /bin/grpc_health_probe
WORKDIR /app
COPY --from=builder /app/target/release/shippingservice /shippingservice
ENV PORT=50052

EXPOSE 50052
ENTRYPOINT ["/shippingservice"]
