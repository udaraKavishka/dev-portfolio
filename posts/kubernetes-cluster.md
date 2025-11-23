---
title: 'Building a Kubernetes Cluster from Scratch'
date: '2024-03-15'
excerpt: 'A comprehensive guide to setting up a production-ready Kubernetes cluster using kubeadm, including networking, storage, and monitoring.'
tags: ['Kubernetes', 'DevOps', 'Infrastructure']
---

# Building a Kubernetes Cluster from Scratch

Setting up a Kubernetes cluster from scratch can be daunting, but it's an invaluable learning experience. In this guide, I'll walk you through the process of creating a production-ready cluster.

## Prerequisites

Before we begin, ensure you have:

- At least 3 Linux servers (1 master, 2 workers)
- 2GB RAM minimum per node
- Network connectivity between nodes
- Root or sudo access

## Installing Container Runtime

First, we need to install a container runtime. I'll use containerd:

```bash
# Install containerd
sudo apt-get update
sudo apt-get install -y containerd

# Configure containerd
sudo mkdir -p /etc/containerd
containerd config default | sudo tee /etc/containerd/config.toml

# Restart containerd
sudo systemctl restart containerd
sudo systemctl enable containerd
```

## Installing kubeadm, kubelet, and kubectl

Next, install the Kubernetes components:

```bash
# Add Kubernetes repository
curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.28/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg

echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.28/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list

# Install packages
sudo apt-get update
sudo apt-get install -y kubelet kubeadm kubectl
sudo apt-mark hold kubelet kubeadm kubectl
```

## Initializing the Control Plane

On the master node, initialize the cluster:

```bash
sudo kubeadm init --pod-network-cidr=10.244.0.0/16
```

After initialization, configure kubectl:

```bash
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

## Installing a CNI Plugin

Install Flannel for pod networking:

```bash
kubectl apply -f https://raw.githubusercontent.com/flannel-io/flannel/master/Documentation/kube-flannel.yml
```

## Joining Worker Nodes

On each worker node, run the join command from the kubeadm init output:

```bash
sudo kubeadm join <master-ip>:6443 --token <token> --discovery-token-ca-cert-hash sha256:<hash>
```

## Verification

Verify all nodes are ready:

```bash
kubectl get nodes
```

## Conclusion

You now have a functional Kubernetes cluster! Next steps include setting up persistent storage, ingress controllers, and monitoring solutions.
