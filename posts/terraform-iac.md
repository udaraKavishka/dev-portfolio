---
title: 'Infrastructure as Code with Terraform'
date: '2024-03-05'
excerpt: 'Master Terraform to manage your cloud infrastructure efficiently. Learn best practices, modules, and state management.'
tags: ['Terraform', 'IaC', 'AWS', 'DevOps']
---

# Infrastructure as Code with Terraform

Terraform has become the de facto standard for infrastructure as code. Let's explore how to use it effectively.

## Why Terraform?

- **Cloud-agnostic**: Works with AWS, Azure, GCP, and more
- **Declarative**: Describe what you want, not how to get there
- **State management**: Tracks your infrastructure
- **Modular**: Reusable components

## Getting Started

Install Terraform:

```bash
# On macOS
brew install terraform

# On Linux
wget https://releases.hashicorp.com/terraform/1.6.0/terraform_1.6.0_linux_amd64.zip
unzip terraform_1.6.0_linux_amd64.zip
sudo mv terraform /usr/local/bin/
```

## Basic Configuration

Create a simple AWS EC2 instance:

```hcl
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-west-2"
}

resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"

  tags = {
    Name = "WebServer"
  }
}
```

## Terraform Workflow

1. **Write**: Define infrastructure in `.tf` files
2. **Plan**: Preview changes with `terraform plan`
3. **Apply**: Create resources with `terraform apply`
4. **Destroy**: Clean up with `terraform destroy`

## Using Modules

Create reusable modules:

```hcl
module "vpc" {
  source = "./modules/vpc"
  
  cidr_block = "10.0.0.0/16"
  name       = "production-vpc"
}
```

## State Management

Store state remotely for team collaboration:

```hcl
terraform {
  backend "s3" {
    bucket = "my-terraform-state"
    key    = "prod/terraform.tfstate"
    region = "us-west-2"
  }
}
```

## Best Practices

1. **Use workspaces** for different environments
2. **Implement remote state** with locking
3. **Use variables** for flexibility
4. **Create modules** for reusability
5. **Version your modules** properly
6. **Use `.tfvars` files** for sensitive data

## Conclusion

Terraform enables you to manage infrastructure efficiently and consistently. Start small, use modules, and always plan before applying!
