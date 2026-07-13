#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Set the script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

echo -e "${BLUE}🏔️  Tajikistan Learning App${NC}"
echo -e "${BLUE}================================${NC}\n"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}⚠️  Node.js is not installed. Please install Node.js 16+ from https://nodejs.org${NC}"
    exit 1
fi

# Check Node version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo -e "${YELLOW}⚠️  Node.js 16+ required. Current version: $(node -v)${NC}"
    exit 1
fi

echo -e "${GREEN}✓${NC} Node.js version: $(node -v)"
echo -e "${GREEN}✓${NC} npm version: $(npm -v)\n"

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo -e "${BLUE}📦 Installing dependencies...${NC}"
    npm install
    if [ $? -ne 0 ]; then
        echo -e "${YELLOW}⚠️  npm install failed${NC}"
        exit 1
    fi
    echo -e "${GREEN}✓ Dependencies installed${NC}\n"
else
    echo -e "${GREEN}✓ Dependencies already installed${NC}\n"
fi

# Check for .env.local
if [ ! -f ".env.local" ]; then
    echo -e "${YELLOW}⚠️  .env.local not found${NC}"
    echo -e "${BLUE}📝 Setting up environment variables...${NC}\n"
    cp .env.example .env.local
    echo -e "${YELLOW}Please edit .env.local and add your OpenAI API key:${NC}"
    echo -e "   VITE_OPENAI_KEY=sk-...\n"
    echo -e "${BLUE}Then run this script again.${NC}\n"
    read -p "Have you added your OpenAI key to .env.local? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
else
    echo -e "${GREEN}✓ .env.local configured${NC}\n"
fi

# Start the dev server
echo -e "${BLUE}🚀 Starting development server...${NC}\n"
echo -e "${GREEN}The app will be available at:${NC}"
echo -e "${BLUE}   http://localhost:5173${NC}\n"
echo -e "${YELLOW}Press Ctrl+C to stop the server${NC}\n"

npm run dev
