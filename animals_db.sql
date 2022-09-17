/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80027
 Source Host           : localhost:3306
 Source Schema         : animals_db

 Target Server Type    : MySQL
 Target Server Version : 80027
 File Encoding         : 65001

 Date: 17/09/2022 17:05:34
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin_tabel
-- ----------------------------
DROP TABLE IF EXISTS `admin_tabel`;
CREATE TABLE `admin_tabel`  (
  `account_id` char(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '账号id',
  `account` char(24) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '账号',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码',
  PRIMARY KEY (`account_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin_tabel
-- ----------------------------
INSERT INTO `admin_tabel` VALUES ('1ca56', 'admin', 'admin');

-- ----------------------------
-- Table structure for comment_list
-- ----------------------------
DROP TABLE IF EXISTS `comment_list`;
CREATE TABLE `comment_list`  (
  `id` int(0) NOT NULL,
  `dy_id` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `c_id` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `comment_id` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `is_cancel` enum('0','-1') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '0',
  `time` char(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comment_list
-- ----------------------------

-- ----------------------------
-- Table structure for dynamic_list
-- ----------------------------
DROP TABLE IF EXISTS `dynamic_list`;
CREATE TABLE `dynamic_list`  (
  `id` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `c_id` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `titel` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `tag` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `content` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `images` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `video` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `like` int(0) NULL DEFAULT NULL,
  `comment` int(0) NULL DEFAULT NULL,
  `show` enum('0','-1') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '0',
  `create_time` varbinary(100) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dynamic_list
-- ----------------------------

-- ----------------------------
-- Table structure for like_list
-- ----------------------------
DROP TABLE IF EXISTS `like_list`;
CREATE TABLE `like_list`  (
  `id` int(0) NOT NULL,
  `dy_id` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `c_id` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `like_id` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `is_cancel` enum('0','-1') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '0',
  `time` char(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of like_list
-- ----------------------------

-- ----------------------------
-- Table structure for menu_list
-- ----------------------------
DROP TABLE IF EXISTS `menu_list`;
CREATE TABLE `menu_list`  (
  `m_id` int(0) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `meta` char(60) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `parent_id` int(0) NOT NULL,
  `icon` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `isAuth` int(0) NULL DEFAULT 0 COMMENT '0 为true 1为false 默认0',
  `component` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `create_time` timestamp(0) NULL DEFAULT NULL COMMENT '时间戳',
  `update_time` timestamp(0) NULL DEFAULT NULL,
  `state` int(0) NULL DEFAULT 0 COMMENT '默认0  0正常 1禁用',
  PRIMARY KEY (`m_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of menu_list
-- ----------------------------
INSERT INTO `menu_list` VALUES (1, 'DashBoard', '首页', 0, 'icon-shouye', '/dashboard', 0, 'DashBoardPage', '2022-08-20 00:20:26', NULL, 0);
INSERT INTO `menu_list` VALUES (2, 'UserManagement', '用户管理', 0, 'icon-yonghu', '/dashboard/userManagement', 0, 'SettingsPage', '2022-08-20 00:40:27', NULL, 0);
INSERT INTO `menu_list` VALUES (3, 'DynamicManagement', '动态管理', 0, 'icon-dongtai', '/dashboard/dynamicManagement', 0, 'AboutPage', '2022-08-20 00:41:17', NULL, 0);
INSERT INTO `menu_list` VALUES (4, 'SystemInforms', '系统通知', 0, 'icon-tongzhi', '/dashboard/systemInforms', 0, 'AboutPage', '2022-08-20 00:43:13', NULL, 0);
INSERT INTO `menu_list` VALUES (5, 'AdoptInformation', '领养信息', 0, 'icon-chongwu', '/dashboard/adoptInformation', 0, 'SettingsPage', '2022-08-20 00:45:46', NULL, 0);
INSERT INTO `menu_list` VALUES (6, 'UserState', '状态管理', 2, '', '/dashboard/userManagement/state', 0, 'DashBoardPage', '2022-08-20 00:46:29', NULL, 0);
INSERT INTO `menu_list` VALUES (7, 'DynamicState', '状态管理', 3, '', '/dashboard/dynamicManagement/state', 0, 'AboutPage', '2022-08-20 00:48:15', NULL, 0);
INSERT INTO `menu_list` VALUES (8, 'SettingsPage', '设置', 0, 'icon-seetings', '/dashboard/settings', 0, 'SettingsPage', '2022-08-22 16:49:46', NULL, 0);
INSERT INTO `menu_list` VALUES (10, 'ResetPassword', '密码重置', 2, NULL, '/dashboard/userManagement/resetPassword', 0, NULL, NULL, NULL, 0);

-- ----------------------------
-- Table structure for notice
-- ----------------------------
DROP TABLE IF EXISTS `notice`;
CREATE TABLE `notice`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `createtime` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `status` enum('0','-1') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '0' COMMENT '\'0\'正常 ,\'-1\'删除',
  `show` enum('0','-1') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '0' COMMENT '\'0\'显示,\'-1\'不显示',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of notice
-- ----------------------------
INSERT INTO `notice` VALUES (1, '测试1', '测试内容', '2022-08-23 16:24:30', '-1', '0');
INSERT INTO `notice` VALUES (2, '测试2', '测试内容', '2022-08-23 13:51:35', '0', '0');
INSERT INTO `notice` VALUES (3, '0823', '通知功能1', '2022-08-23 16:52:10', '0', '0');
INSERT INTO `notice` VALUES (4, 'vcsd01', '通讯稿', '2022-08-23 18:23:39', '0', '0');
INSERT INTO `notice` VALUES (5, '重新申请', '传输层', '2022-07-29 18:23:52', '0', '0');
INSERT INTO `notice` VALUES (6, '2020-08-26', '新增一条通知2', '2022-08-26 15:29:57', '0', '0');
INSERT INTO `notice` VALUES (7, '测试通知', 'shabi', '2022-08-26 16:09:29', '-1', '0');
INSERT INTO `notice` VALUES (8, '26日测试', '搜索功能', '2022-08-26 17:27:23', '0', '0');

-- ----------------------------
-- Table structure for user_info
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info`  (
  `id` char(18) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `nickname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `tel` char(18) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `createtime` char(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `status` enum('0','-1') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '0' COMMENT '\'0\'正常,\'-1\'冻结',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_info
-- ----------------------------
INSERT INTO `user_info` VALUES ('2MBBDE19', 'Test009', 'Nick_3wbNdDKMNn', '$2a$10$QDjQelB3nwWfnA4zhRRjK.69tUzVr/r51xD/UUV0.JbFCK8fAU3bq', 'https://jianlu.oss-cn-hangzhou.aliyuncs.com/Ellipse2.png?versionId=CAEQahiBgMDpvbGZlhgiIDBiMDI2Y2I1NDZkYjQzOTY4YjUzZGQ5MmUwNDU3ODk4', '13133969126', NULL, '2022-08-27 23:56:38', '0');
INSERT INTO `user_info` VALUES ('7101A91V', 'Test003', 'Nick_3wbNvDKMNK', '$2a$10$elUBiMKKZX2d8kNCyob7H.0TKfbOM3ojqwy9wItDPThVY1nj24yPu', 'https://jianlu.oss-cn-hangzhou.aliyuncs.com/Ellipse2.png?versionId=CAEQahiBgMDpvbGZlhgiIDBiMDI2Y2I1NDZkYjQzOTY4YjUzZGQ5MmUwNDU3ODk4', '13133969127', NULL, '2022-08-27 23:57:45', '0');
INSERT INTO `user_info` VALUES ('729EVHDP', 'Test004', 'Nick_Ehva3k7wM6', '$2a$10$Q/flarhIa4CPZZh2F7IaSucnmVmDqID9WlT4NvO1jyGwFAp/wXLq2', 'https://jianlu.oss-cn-hangzhou.aliyuncs.com/Ellipse2.png?versionId=CAEQahiBgMDpvbGZlhgiIDBiMDI2Y2I1NDZkYjQzOTY4YjUzZGQ5MmUwNDU3ODk4', '13133969127', NULL, '2022-08-27 23:51:32', '0');
INSERT INTO `user_info` VALUES ('8A8WBCMG', 'Test015', 'Nick_fPeH0wKnkP', '$2a$10$Lw0AtfZpT1kh.5Li09hiFuaFYMwd1EPIJtpsBFhMK37V04KUJ/4xG', 'https://jianlu.oss-cn-hangzhou.aliyuncs.com/Ellipse2.png?versionId=CAEQahiBgMDpvbGZlhgiIDBiMDI2Y2I1NDZkYjQzOTY4YjUzZGQ5MmUwNDU3ODk4', '13133969127', NULL, '2022-08-27 23:59:39', '0');
INSERT INTO `user_info` VALUES ('8EF54NC8', 'Test006', 'Nick_aVM74M7Ec7', '$2a$10$1Slvv0Zbw7ZXKnMk4fWZeuRIkL.k0sBi7cuzq0YcrgbYds.lR8U0u', 'https://jianlu.oss-cn-hangzhou.aliyuncs.com/Ellipse2.png?versionId=CAEQahiBgMDpvbGZlhgiIDBiMDI2Y2I1NDZkYjQzOTY4YjUzZGQ5MmUwNDU3ODk4', '13133969127', NULL, '2022-08-27 23:55:19', '0');
INSERT INTO `user_info` VALUES ('AV0BW0V3', 'Test007', 'Nick_2Fv8CF84PB', '$2a$10$RbCb/WlX9Xi5imQ81XWuDeQrLVE6ji7w.sMsZGD6TsKkSufn8NdPG', 'https://jianlu.oss-cn-hangzhou.aliyuncs.com/Ellipse2.png?versionId=CAEQahiBgMDpvbGZlhgiIDBiMDI2Y2I1NDZkYjQzOTY4YjUzZGQ5MmUwNDU3ODk4', '13133969127', NULL, '2022-08-27 23:54:55', '0');
INSERT INTO `user_info` VALUES ('DBW42F58', 'Test005', 'Nick_1fDf3aH025', '$2a$10$v3fcn4w.CnQZD.Pw.qrxBefeqznC2Q1JJmDNr5i0.11DX4uuRRC4C', 'https://jianlu.oss-cn-hangzhou.aliyuncs.com/Ellipse2.png?versionId=CAEQahiBgMDpvbGZlhgiIDBiMDI2Y2I1NDZkYjQzOTY4YjUzZGQ5MmUwNDU3ODk4', '13133969127', NULL, '2022-08-27 23:58:33', '0');
INSERT INTO `user_info` VALUES ('F32A8PE1', 'Test008', 'Nick_C8e94AfhEP', '$2a$10$y.jPzD6J7oxyPOYD/ZuGXeAp2J4kxgz.PzuXr1BebGRG5bCtNv.kG', 'http://animals-oss.oss-cn-shanghai.aliyuncs.com/2022-08-28/b41e11a950cadd8f457730139eeedec9.png', '13133969127', NULL, '2022-08-27 23:53:25', '0');
INSERT INTO `user_info` VALUES ('FEG1EV11', 'Test001', 'Nick_PnMbawcBW5', '$2a$10$oK3H6z/Xc70sttGl6KaGOOscwTCV6SMGu/iJi5Lmy3gPPBI15CSLG', 'http://animals-oss.oss-cn-shanghai.aliyuncs.com/2022-08-28/b41e11a950cadd8f457730139eeedec9.png', '13133969127', NULL, '2022-08-27 23:49:52', '0');
INSERT INTO `user_info` VALUES ('H0FW4PFH', 'Test010', 'Nick_B7vv3kBaAP', '$2a$10$nbEYwMoH74tiv6suZjHggeRv7.64fXrxdjd48N.fJBE1e78R7865a', 'http://animals-oss.oss-cn-shanghai.aliyuncs.com/2022-08-28/b41e11a950cadd8f457730139eeedec9.png', '13133969127', NULL, '2022-08-27 23:52:11', '0');
INSERT INTO `user_info` VALUES ('HGVH4V0W', 'adminTest02', 'Nick_acW4Vc2Mpm', '$2a$10$LqVzXKFwJGqXOG2Es7a.F.kfDq.cX19zDAJEHcJTYCZnbgNznbVWO', 'http://animals-oss.oss-cn-shanghai.aliyuncs.com/2022-08-28/b41e11a950cadd8f457730139eeedec9.png', '15797748985', NULL, '2022-08-29 23:02:15', '0');
INSERT INTO `user_info` VALUES ('MF5DPVV4', 'Test011', 'Nick_7PcCkc8PMp', '$2a$10$UiFYzte79fOLjO0hmUFAw.w6tqpKXkWCZv5bj67JDwNq92kSYO60e', 'http://animals-oss.oss-cn-shanghai.aliyuncs.com/2022-08-28/b41e11a950cadd8f457730139eeedec9.png', '13133969127', NULL, '2022-08-27 23:55:45', '0');
INSERT INTO `user_info` VALUES ('N4523CDD', 'Test012', 'Nick_b5AEHAWVdp', '$2a$10$cBgLrN5ReuXwdqCsyMWCo.vYRwr6N/lTCRcD3HQvf3qMlstzCH/vO', 'http://animals-oss.oss-cn-shanghai.aliyuncs.com/2022-08-28/b41e11a950cadd8f457730139eeedec9.png', '13133969127', NULL, '2022-08-27 23:53:45', '0');
INSERT INTO `user_info` VALUES ('W6D2BBA8', 'Test013', 'Nick_FDPKnKN67B', '$2a$10$0CTt38mu6354fQgz88fCx.qlh6f8M4xQry6lDMwenHnpw7rWjTCbq', 'http://animals-oss.oss-cn-shanghai.aliyuncs.com/2022-08-28/b41e11a950cadd8f457730139eeedec9.png', '13133969127', NULL, '2022-08-27 23:54:21', '0');
INSERT INTO `user_info` VALUES ('x1A516', 'TESTADMIN', '测试账号', '$2a$10$nbEYwMoH74tiv6suZjHggeRv7.64fXrxdjd48N.fJBE1e78R7865a', 'http://animals-oss.oss-cn-shanghai.aliyuncs.com/2022-08-28/b41e11a950cadd8f457730139eeedec9.png', '15797748987', 'No. 189, Grove St, Los Angeles', '2022-08-23 20:08:52', '0');

SET FOREIGN_KEY_CHECKS = 1;
