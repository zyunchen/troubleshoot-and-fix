# Seattle Handyman Website

## 使用您的Logo图片

1. 将您的logo图片文件命名为 `logo.png`
2. 将图片文件放在与 `index.html` 相同的文件夹中
3. 确保图片格式为 PNG、JPG 或 SVG
4. 建议图片尺寸：宽度 200-300px，高度 50-80px

## 网站特点

- ✅ 使用您的实际logo图片
- ✅ 去除了所有渐变效果，使用纯色设计
- ✅ 响应式设计，适配所有设备
- ✅ 专业的配色方案（黄色 #F8E71C + 黑色）
- ✅ 完整的联系表单和邮件发送功能
- ✅ 自动发送邮件到 troubleshootandfixhandyman@gmail.com

## 文件结构

```
/
├── index.html          # 主页面
├── styles.css          # 样式文件
├── script.js           # 交互功能
├── logo.png           # 您的logo图片（需要添加）
└── README.md          # 说明文件
```

## 邮件功能

联系表单现在使用 [EmailJS](https://www.emailjs.com/) 服务发送邮件：

### EmailJS 设置步骤

#### 1. 创建 EmailJS 账户
1. 访问 [https://www.emailjs.com/](https://www.emailjs.com/)
2. 点击 "Sign Up Free" 创建免费账户
3. 验证邮箱地址

#### 2. 连接邮件服务
1. 在 EmailJS 控制台中，点击 "Email Services"
2. 选择 "Add New Service"
3. 选择 Gmail（推荐）或其他邮件服务
4. 按照说明连接您的 Gmail 账户
5. 记录下 Service ID

#### 3. 创建邮件模板
1. 在控制台中点击 "Email Templates"
2. 点击 "Create New Template"
3. 设置模板内容：

**模板设置：**
- **Template Name**: `contact_form`
- **Subject**: `New Contact Form Submission - Seattle Handyman`
- **Content**:
```
From: {{from_email}}
Message: {{message}}

This message was sent from the Seattle Handyman website contact form.
```

4. 保存模板并记录 Template ID

#### 4. 获取公钥
1. 在控制台中点击 "Account" → "General"
2. 复制 "Public Key"

#### 5. 更新网站代码
在 `index.html` 中替换以下值：
- `YOUR_PUBLIC_KEY` → `e7rlcGvqs1YeAMu7O` ✅
- `YOUR_SERVICE_ID` → `service_j74lhje` ✅
- `YOUR_TEMPLATE_ID` → `template_qen7pf9` ✅

### 优势
- ✅ **专业服务** - 超过25,000开发者信任
- ✅ **免费计划** - 每月200封邮件免费
- ✅ **安全可靠** - 服务器端认证，客户端安全
- ✅ **即时发送** - 无需用户操作
- ✅ **支持多种邮件服务** - Gmail、Outlook、Yahoo等

## 自定义信息

在 `index.html` 中更新以下信息：
- 微信：seattle_zhang
- 邮箱：troubleshootandfixhandyman@gmail.com
- 服务区域：根据您的实际服务范围调整

## 测试表单

1. 完成 EmailJS 设置
2. 打开 `index.html` 文件
3. 填写邮箱和项目描述
4. 点击"Send Message"按钮
5. 邮件会自动发送到 `troubleshootandfixhandyman@gmail.com`

## 部署

### 任何平台都可以
- **Netlify** - 拖拽上传即可
- **Vercel** - 连接GitHub仓库
- **GitHub Pages** - 推送到GitHub
- **任何Web服务器** - 上传文件即可

### 注意事项
- 确保已正确配置 EmailJS
- 免费计划每月200封邮件
- 支持所有现代浏览器