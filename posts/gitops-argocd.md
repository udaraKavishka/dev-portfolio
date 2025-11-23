---
title: 'GitOps with ArgoCD: A Complete Guide'
date: '2024-03-10'
excerpt: 'Learn how to implement GitOps practices using ArgoCD for declarative, version-controlled application deployments on Kubernetes.'
tags: ['GitOps', 'ArgoCD', 'Kubernetes', 'CI/CD']
---

# GitOps with ArgoCD: A Complete Guide

GitOps has revolutionized how we manage Kubernetes deployments. In this guide, we'll explore ArgoCD, a declarative GitOps continuous delivery tool.

## What is GitOps?

GitOps is a paradigm where Git is the single source of truth for declarative infrastructure and applications. Changes are made through pull requests, and automated processes ensure the cluster state matches the Git repository.

## Installing ArgoCD

Install ArgoCD in your Kubernetes cluster:

```bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

Access the ArgoCD UI:

```bash
kubectl port-forward svc/argocd-server -n argocd 8080:443
```

Get the initial admin password:

```bash
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
```

## Creating Your First Application

Create an Application manifest:

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: my-app
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/your-org/your-repo
    targetRevision: HEAD
    path: k8s
  destination:
    server: https://kubernetes.default.svc
    namespace: production
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
```

Apply the application:

```bash
kubectl apply -f application.yaml
```

## Sync Strategies

ArgoCD supports multiple sync strategies:

- **Manual Sync**: Requires manual intervention
- **Automated Sync**: Automatically syncs when changes are detected
- **Self-Healing**: Automatically corrects drift

## Best Practices

1. **Use separate repositories** for application code and Kubernetes manifests
2. **Implement RBAC** to control who can deploy what
3. **Use App of Apps pattern** for managing multiple applications
4. **Enable notifications** for sync events
5. **Implement proper branching strategy** (e.g., gitflow)

## Conclusion

ArgoCD simplifies Kubernetes deployments and ensures your cluster state matches your Git repository. It's an essential tool for modern DevOps workflows.
