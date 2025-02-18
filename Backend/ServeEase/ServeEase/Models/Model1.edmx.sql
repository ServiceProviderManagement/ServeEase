
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 08/24/2023 22:37:25
-- Generated from EDMX file: D:\DAC Project\fantastic-waffle\BackEnd\ServeEaseV3\Models\Model1.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [myDacProject];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[FK__addresses__dummy__2F10007B]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[addresses] DROP CONSTRAINT [FK__addresses__dummy__2F10007B];
GO
IF OBJECT_ID(N'[dbo].[FK__appointme__cust___35BCFE0A]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[appointments] DROP CONSTRAINT [FK__appointme__cust___35BCFE0A];
GO
IF OBJECT_ID(N'[dbo].[FK__appointme__sp_id__36B12243]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[appointments] DROP CONSTRAINT [FK__appointme__sp_id__36B12243];
GO
IF OBJECT_ID(N'[dbo].[FK__reviews__apt_id__4222D4EF]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[reviews] DROP CONSTRAINT [FK__reviews__apt_id__4222D4EF];
GO
IF OBJECT_ID(N'[dbo].[FK__transacti__apt_i__3D5E1FD2]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[transactions] DROP CONSTRAINT [FK__transacti__apt_i__3D5E1FD2];
GO
IF OBJECT_ID(N'[dbo].[FK__customers__user___2C3393D0]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[customers] DROP CONSTRAINT [FK__customers__user___2C3393D0];
GO
IF OBJECT_ID(N'[dbo].[FK__reviews__cust_id__403A8C7D]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[reviews] DROP CONSTRAINT [FK__reviews__cust_id__403A8C7D];
GO
IF OBJECT_ID(N'[dbo].[FK__payment_d__dummy__398D8EEE]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[payment_details] DROP CONSTRAINT [FK__payment_d__dummy__398D8EEE];
GO
IF OBJECT_ID(N'[dbo].[FK__transacti__payme__3C69FB99]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[transactions] DROP CONSTRAINT [FK__transacti__payme__3C69FB99];
GO
IF OBJECT_ID(N'[dbo].[FK__reviews__sp_id__412EB0B6]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[reviews] DROP CONSTRAINT [FK__reviews__sp_id__412EB0B6];
GO
IF OBJECT_ID(N'[dbo].[FK__service_p__user___29572725]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[service_providers] DROP CONSTRAINT [FK__service_p__user___29572725];
GO

-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[addresses]', 'U') IS NOT NULL
    DROP TABLE [dbo].[addresses];
GO
IF OBJECT_ID(N'[dbo].[appointments]', 'U') IS NOT NULL
    DROP TABLE [dbo].[appointments];
GO
IF OBJECT_ID(N'[dbo].[customers]', 'U') IS NOT NULL
    DROP TABLE [dbo].[customers];
GO
IF OBJECT_ID(N'[dbo].[payment_details]', 'U') IS NOT NULL
    DROP TABLE [dbo].[payment_details];
GO
IF OBJECT_ID(N'[dbo].[reviews]', 'U') IS NOT NULL
    DROP TABLE [dbo].[reviews];
GO
IF OBJECT_ID(N'[dbo].[service_providers]', 'U') IS NOT NULL
    DROP TABLE [dbo].[service_providers];
GO
IF OBJECT_ID(N'[dbo].[transactions]', 'U') IS NOT NULL
    DROP TABLE [dbo].[transactions];
GO
IF OBJECT_ID(N'[dbo].[users]', 'U') IS NOT NULL
    DROP TABLE [dbo].[users];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'addresses'
CREATE TABLE [dbo].[addresses] (
    [address_id] int IDENTITY(1,1) NOT NULL,
    [user_id] int  NOT NULL,
    [city] varchar(50)  NOT NULL,
    [district] varchar(50)  NOT NULL,
    [state] varchar(50)  NOT NULL,
    [address1] varchar(100)  NOT NULL,
    [pin_code] varchar(10)  NOT NULL,
    [dummy_column1] varchar(50)  NULL,
    [dummy_column2] varchar(50)  NULL,
    [dummy_column3] varchar(50)  NULL,
    [dummy_column4] varchar(50)  NULL,
    [dummy_column5] varchar(50)  NULL
);
GO

-- Creating table 'appointments'
CREATE TABLE [dbo].[appointments] (
    [apt_id] int IDENTITY(1,1) NOT NULL,
    [cust_id] int  NOT NULL,
    [sp_id] int  NOT NULL,
    [ord_description] varchar(200)  NULL,
    [order_date] datetime  NOT NULL,
    [apt_date] datetime  NOT NULL,
    [apt_status] varchar(20)  NOT NULL
);
GO

-- Creating table 'customers'
CREATE TABLE [dbo].[customers] (
    [cust_id] int IDENTITY(1,1) NOT NULL,
    [user_id] int  NOT NULL
);
GO

-- Creating table 'payment_details'
CREATE TABLE [dbo].[payment_details] (
    [pd_id] int IDENTITY(1,1) NOT NULL,
    [user_id] int  NULL,
    [bank_name] varchar(30)  NOT NULL,
    [branch_name] varchar(50)  NOT NULL,
    [ifsc_code] varchar(20)  NOT NULL,
    [acc_no] varchar(16)  NOT NULL,
    [card_number] varchar(16)  NOT NULL,
    [card_expiry] datetime  NOT NULL,
    [card_cvv] varchar(4)  NOT NULL,
    [dummy_column1] varchar(50)  NULL,
    [dummy_column2] varchar(50)  NULL,
    [dummy_column3] varchar(50)  NULL,
    [dummy_column4] varchar(50)  NULL,
    [dummy_column5] varchar(50)  NULL
);
GO

-- Creating table 'reviews'
CREATE TABLE [dbo].[reviews] (
    [review_id] int IDENTITY(1,1) NOT NULL,
    [cust_id] int  NOT NULL,
    [sp_id] int  NOT NULL,
    [apt_id] int  NOT NULL,
    [review1] varchar(200)  NULL,
    [complaint] varchar(200)  NULL,
    [ratings] int  NULL
);
GO

-- Creating table 'service_providers'
CREATE TABLE [dbo].[service_providers] (
    [sp_id] int IDENTITY(1,1) NOT NULL,
    [user_id] int  NOT NULL,
    [profession] varchar(50)  NULL,
    [experience] int  NULL,
    [expertise] varchar(100)  NULL,
    [description] varchar(200)  NULL,
    [charges] decimal(10,2)  NULL,
    [profile_pic] varchar(100)  NULL,
    [other_images] varchar(100)  NULL
);
GO

-- Creating table 'transactions'
CREATE TABLE [dbo].[transactions] (
    [transaction_id] int IDENTITY(1,1) NOT NULL,
    [payment_id] int  NULL,
    [apt_id] int  NULL,
    [tx_date] datetime  NOT NULL,
    [payment_token_id] int  NULL,
    [amount] decimal(10,2)  NULL,
    [tx_status] varchar(20)  NULL
);
GO

-- Creating table 'users'
CREATE TABLE [dbo].[users] (
    [user_id] int IDENTITY(1,1) NOT NULL,
    [first_name] varchar(50)  NOT NULL,
    [last_name] varchar(50)  NOT NULL,
    [email] varchar(100)  NOT NULL,
    [mobile] varchar(20)  NOT NULL,
    [password] varchar(100)  NOT NULL,
    [dob] datetime  NOT NULL,
    [role_id] varchar(20)  NOT NULL,
    [reg_date] datetime  NOT NULL,
    [dummy_column1] varchar(50)  NULL,
    [dummy_column2] varchar(50)  NULL,
    [dummy_column3] varchar(50)  NULL,
    [dummy_column4] varchar(50)  NULL,
    [dummy_column5] varchar(50)  NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [address_id] in table 'addresses'
ALTER TABLE [dbo].[addresses]
ADD CONSTRAINT [PK_addresses]
    PRIMARY KEY CLUSTERED ([address_id] ASC);
GO

-- Creating primary key on [apt_id] in table 'appointments'
ALTER TABLE [dbo].[appointments]
ADD CONSTRAINT [PK_appointments]
    PRIMARY KEY CLUSTERED ([apt_id] ASC);
GO

-- Creating primary key on [cust_id] in table 'customers'
ALTER TABLE [dbo].[customers]
ADD CONSTRAINT [PK_customers]
    PRIMARY KEY CLUSTERED ([cust_id] ASC);
GO

-- Creating primary key on [pd_id] in table 'payment_details'
ALTER TABLE [dbo].[payment_details]
ADD CONSTRAINT [PK_payment_details]
    PRIMARY KEY CLUSTERED ([pd_id] ASC);
GO

-- Creating primary key on [review_id] in table 'reviews'
ALTER TABLE [dbo].[reviews]
ADD CONSTRAINT [PK_reviews]
    PRIMARY KEY CLUSTERED ([review_id] ASC);
GO

-- Creating primary key on [sp_id] in table 'service_providers'
ALTER TABLE [dbo].[service_providers]
ADD CONSTRAINT [PK_service_providers]
    PRIMARY KEY CLUSTERED ([sp_id] ASC);
GO

-- Creating primary key on [transaction_id] in table 'transactions'
ALTER TABLE [dbo].[transactions]
ADD CONSTRAINT [PK_transactions]
    PRIMARY KEY CLUSTERED ([transaction_id] ASC);
GO

-- Creating primary key on [user_id] in table 'users'
ALTER TABLE [dbo].[users]
ADD CONSTRAINT [PK_users]
    PRIMARY KEY CLUSTERED ([user_id] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- Creating foreign key on [user_id] in table 'addresses'
ALTER TABLE [dbo].[addresses]
ADD CONSTRAINT [FK__addresses__dummy__2F10007B]
    FOREIGN KEY ([user_id])
    REFERENCES [dbo].[users]
        ([user_id])
    ON DELETE CASCADE ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__addresses__dummy__2F10007B'
CREATE INDEX [IX_FK__addresses__dummy__2F10007B]
ON [dbo].[addresses]
    ([user_id]);
GO

-- Creating foreign key on [cust_id] in table 'appointments'
ALTER TABLE [dbo].[appointments]
ADD CONSTRAINT [FK__appointme__cust___35BCFE0A]
    FOREIGN KEY ([cust_id])
    REFERENCES [dbo].[customers]
        ([cust_id])
    ON DELETE CASCADE ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__appointme__cust___35BCFE0A'
CREATE INDEX [IX_FK__appointme__cust___35BCFE0A]
ON [dbo].[appointments]
    ([cust_id]);
GO

-- Creating foreign key on [sp_id] in table 'appointments'
ALTER TABLE [dbo].[appointments]
ADD CONSTRAINT [FK__appointme__sp_id__36B12243]
    FOREIGN KEY ([sp_id])
    REFERENCES [dbo].[service_providers]
        ([sp_id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__appointme__sp_id__36B12243'
CREATE INDEX [IX_FK__appointme__sp_id__36B12243]
ON [dbo].[appointments]
    ([sp_id]);
GO

-- Creating foreign key on [apt_id] in table 'reviews'
ALTER TABLE [dbo].[reviews]
ADD CONSTRAINT [FK__reviews__apt_id__4222D4EF]
    FOREIGN KEY ([apt_id])
    REFERENCES [dbo].[appointments]
        ([apt_id])
    ON DELETE CASCADE ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__reviews__apt_id__4222D4EF'
CREATE INDEX [IX_FK__reviews__apt_id__4222D4EF]
ON [dbo].[reviews]
    ([apt_id]);
GO

-- Creating foreign key on [apt_id] in table 'transactions'
ALTER TABLE [dbo].[transactions]
ADD CONSTRAINT [FK__transacti__apt_i__3D5E1FD2]
    FOREIGN KEY ([apt_id])
    REFERENCES [dbo].[appointments]
        ([apt_id])
    ON DELETE CASCADE ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__transacti__apt_i__3D5E1FD2'
CREATE INDEX [IX_FK__transacti__apt_i__3D5E1FD2]
ON [dbo].[transactions]
    ([apt_id]);
GO

-- Creating foreign key on [user_id] in table 'customers'
ALTER TABLE [dbo].[customers]
ADD CONSTRAINT [FK__customers__user___2C3393D0]
    FOREIGN KEY ([user_id])
    REFERENCES [dbo].[users]
        ([user_id])
    ON DELETE CASCADE ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__customers__user___2C3393D0'
CREATE INDEX [IX_FK__customers__user___2C3393D0]
ON [dbo].[customers]
    ([user_id]);
GO

-- Creating foreign key on [cust_id] in table 'reviews'
ALTER TABLE [dbo].[reviews]
ADD CONSTRAINT [FK__reviews__cust_id__403A8C7D]
    FOREIGN KEY ([cust_id])
    REFERENCES [dbo].[customers]
        ([cust_id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__reviews__cust_id__403A8C7D'
CREATE INDEX [IX_FK__reviews__cust_id__403A8C7D]
ON [dbo].[reviews]
    ([cust_id]);
GO

-- Creating foreign key on [user_id] in table 'payment_details'
ALTER TABLE [dbo].[payment_details]
ADD CONSTRAINT [FK__payment_d__dummy__398D8EEE]
    FOREIGN KEY ([user_id])
    REFERENCES [dbo].[users]
        ([user_id])
    ON DELETE CASCADE ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__payment_d__dummy__398D8EEE'
CREATE INDEX [IX_FK__payment_d__dummy__398D8EEE]
ON [dbo].[payment_details]
    ([user_id]);
GO

-- Creating foreign key on [payment_id] in table 'transactions'
ALTER TABLE [dbo].[transactions]
ADD CONSTRAINT [FK__transacti__payme__3C69FB99]
    FOREIGN KEY ([payment_id])
    REFERENCES [dbo].[payment_details]
        ([pd_id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__transacti__payme__3C69FB99'
CREATE INDEX [IX_FK__transacti__payme__3C69FB99]
ON [dbo].[transactions]
    ([payment_id]);
GO

-- Creating foreign key on [sp_id] in table 'reviews'
ALTER TABLE [dbo].[reviews]
ADD CONSTRAINT [FK__reviews__sp_id__412EB0B6]
    FOREIGN KEY ([sp_id])
    REFERENCES [dbo].[service_providers]
        ([sp_id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__reviews__sp_id__412EB0B6'
CREATE INDEX [IX_FK__reviews__sp_id__412EB0B6]
ON [dbo].[reviews]
    ([sp_id]);
GO

-- Creating foreign key on [user_id] in table 'service_providers'
ALTER TABLE [dbo].[service_providers]
ADD CONSTRAINT [FK__service_p__user___29572725]
    FOREIGN KEY ([user_id])
    REFERENCES [dbo].[users]
        ([user_id])
    ON DELETE CASCADE ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__service_p__user___29572725'
CREATE INDEX [IX_FK__service_p__user___29572725]
ON [dbo].[service_providers]
    ([user_id]);
GO

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------