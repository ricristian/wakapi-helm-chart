#!bin/sh

helm package src/*

helm repo index --url https://ricristian.github.io/wakapi-helm-chart .