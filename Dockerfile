# Sử dụng image Node.js phiên bản LTS chính thức
FROM node:16-alpine

# Thiết lập thư mục làm việc trong container
WORKDIR /usr/src/app

# Sao chép file package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install --production

# Sao chép mã nguồn vào container
COPY . .

# Expose cổng mà ứng dụng sử dụng


# Câu lệnh để chạy ứng dụng
CMD ["npm", "start"]
