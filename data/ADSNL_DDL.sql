/*
Created		28/07/2020
Modified		28/09/2020
Project		
Model			
Company		
Author		
Version		
Database		MS SQL 2005 

*/


Create table [Product_Info]
(
	[Prod_SKU] Integer NOT NULL, UNIQUE ([Prod_SKU]),
	[Dept_ID] Integer NOT NULL,
	[Brand_ID] Integer NULL,
	[Cat_ID] Integer NULL,
	[Supplier_ID] Integer NULL,
	[Makeup_Attribute_ID] Integer NULL,
	[Prod_Name] Varchar(200) NULL,
	[Prod_Price] Decimal(10,2) NULL,
	[Prod_Model_Number] Varchar(20) NULL,
	[Prod_ASIN] Varchar(20) NULL,
	[Prod_ISBN_10] Varchar(12) NULL,
	[Prod_ISBN_13] Varchar(15) NULL,
	[Prod_Volume] Varchar(15) NULL,
	[Prod_Dimension] Varchar(20) NULL,
	[Prod_UPC] Varchar(15) NULL,
	[Prod_Stock] Integer NULL,
Primary Key ([Prod_SKU])
) 
go

Create table [Department]
(
	[Dept_ID] Integer Identity NOT NULL,
	[Dept_Name] Varchar(30) NULL,
Primary Key ([Dept_ID])
) 
go

Create table [Category]
(
	[Cat_ID] Integer Identity NOT NULL,
	[Dept_ID] Integer NULL,
	[Cat_Name] Varchar(50) NULL,
Primary Key ([Cat_ID])
) 
go

Create table [Brand]
(
	[Brand_ID] Integer Identity NOT NULL,
	[Brand_Name] Varchar(50) NULL,
Primary Key ([Brand_ID])
) 
go

Create table [Author_Director]
(
	[AutDir_ID] Integer Identity NOT NULL,
	[FirstName] Varchar(50) NULL,
	[MiddleName] Varchar(10) NULL,
	[LastName] Varchar(50) NULL,
Primary Key ([AutDir_ID])
) 
go

Create table [AD_Lookup]
(
	[Prod_SKU] Integer NOT NULL,
	[AutDir_ID] Integer NOT NULL
) 
go

Create table [Media]
(
	[Media_ID] Integer Identity NOT NULL,
	[Media_Name] Varchar(50) NULL,
Primary Key ([Media_ID])
) 
go

Create table [Media_Lookup]
(
	[Prod_SKU] Integer NOT NULL,
	[Media_ID] Integer NOT NULL,
	[Media_Price] Decimal(10,2) NULL,
	[Stock] Integer NULL
) 
go

Create table [Color]
(
	[Color_ID] Integer Identity NOT NULL,
	[Color_Name] Varchar(25) NULL,
Primary Key ([Color_ID])
) 
go

Create table [Feature_Lookup]
(
	[Prod_SKU] Integer NOT NULL,
	[Size_ID] Integer NULL,
	[Color_ID] Integer NULL,
	[Format_ID] Integer NULL,
	[Stock] Integer NULL,
	[Feature_Price] Decimal(10,2) NULL
) 
go

Create table [Size]
(
	[Size_ID] Integer Identity NOT NULL,
	[Size_Name] Varchar(15) NULL,
Primary Key ([Size_ID])
) 
go

Create table [Type]
(
	[Type_ID] Integer Identity NOT NULL,
	[Type_Name] Varchar(50) NOT NULL,
Primary Key ([Type_ID])
) 
go

Create table [Type_Lookup]
(
	[Prod_SKU] Integer NOT NULL,
	[Type_ID] Integer NOT NULL,
	[Stock] Integer NULL,
	[Type_Price] Decimal(10,2) NULL
) 
go

Create table [Customer_Master]
(
	[Customer_ID] Integer Identity NOT NULL,
	[CreditCard_ID] Integer NOT NULL,
	[Income_ID] Integer NOT NULL,
	[Degree_ID] Integer NOT NULL,
	[StreetType_ID] Integer NULL,
	[Customer_FName] Varchar(25) NOT NULL,
	[Customer_LName] Varchar(25) NULL,
	[Sex] Char(1) NULL,
	[Birth_Date] Datetime NULL,
	[Zip_Code] Integer NULL,
	[City] Varchar(25) NULL,
	[State] Varchar(2) NULL,
	[Street_Number] Integer NULL,
	[Street_Name] Varchar(1) NULL,
	[Marital_Status_Type] Integer NULL,
Primary Key ([Customer_ID])
) 
go

Create table [Degree_Lookup]
(
	[Degree_ID] Integer Identity NOT NULL,
	[Degree_Name] Varchar(20) NULL,
Primary Key ([Degree_ID])
) 
go

Create table [Income_Lookup]
(
	[Income_ID] Integer Identity NOT NULL,
	[Income_LowerLimit] Decimal(10,2) NULL,
	[Income_UpperLimit] Decimal(10,2) NULL,
Primary Key ([Income_ID])
) 
go

Create table [CreditCard_Lookup]
(
	[CreditCard_ID] Integer Identity NOT NULL,
	[CreditCard_Provider] Varchar(20) NULL,
Primary Key ([CreditCard_ID])
) 
go

Create table [StreetType_Lookup]
(
	[StreetType_ID] Integer Identity NOT NULL,
	[Street_Type] Varchar(25) NULL,
Primary Key ([StreetType_ID])
) 
go

Create table [ChartData]
(
	[Data_ID] Integer Identity NOT NULL,
	[Year] Integer NULL,
	[Order_Count] Integer NULL,
Primary Key ([Data_ID])
) 
go

Create table [Order_Master]
(
	[Order_ID] Integer Identity NOT NULL,
	[Customer_ID] Integer NOT NULL,
	[Order_DateTime] Datetime NULL,
Primary Key ([Order_ID])
) 
go

Create table [Order_Details]
(
	[OrderDetails_ID] Integer Identity NOT NULL,
	[Order_ID] Integer NOT NULL,
	[Prod_SKU] Integer NOT NULL,
	[Price] Decimal(10,2) NULL,
	[Product_Media_ID] Integer NULL,
Primary Key ([OrderDetails_ID])
) 
go

Create table [Makeup_Attributes]
(
	[Makeup_Attribute_ID] Integer Identity NOT NULL,
	[Makeup_Attribute_Name] Varchar(50) NULL,
Primary Key ([Makeup_Attribute_ID])
) 
go

Create table [Supplier]
(
	[Supplier_ID] Integer Identity NOT NULL,
	[Supplier_Name] Varchar(50) NULL,
Primary Key ([Supplier_ID])
) 
go

Create table [Format]
(
	[Format_ID] Integer Identity NOT NULL,
	[FormatName] Varchar(50) NULL,
Primary Key ([Format_ID])
) 
go


Alter table [AD_Lookup] add constraint [AD_Uniquekey] unique ([Prod_SKU],[AutDir_ID])
go


Alter table [Media_Lookup] add constraint [Media_Unique] unique ([Prod_SKU],[Media_ID])
go


Create UNIQUE Index [CompositeKey] ON [Feature_Lookup] ([Prod_SKU],[Size_ID],[Color_ID],[Format_ID])
go


Alter table [Type_Lookup] add constraint [Type_Unique] unique ([Prod_SKU],[Type_ID])
go


Alter table [AD_Lookup] add  foreign key([Prod_SKU]) references [Product_Info] ([Prod_SKU])  on update no action on delete no action 
go
Alter table [Media_Lookup] add  foreign key([Prod_SKU]) references [Product_Info] ([Prod_SKU])  on update no action on delete no action 
go
Alter table [Feature_Lookup] add  foreign key([Prod_SKU]) references [Product_Info] ([Prod_SKU])  on update no action on delete no action 
go
Alter table [Type_Lookup] add  foreign key([Prod_SKU]) references [Product_Info] ([Prod_SKU])  on update no action on delete no action 
go
Alter table [Order_Details] add  foreign key([Prod_SKU]) references [Product_Info] ([Prod_SKU])  on update no action on delete no action 
go
Alter table [Product_Info] add  foreign key([Dept_ID]) references [Department] ([Dept_ID])  on update no action on delete no action 
go
Alter table [Category] add  foreign key([Dept_ID]) references [Department] ([Dept_ID])  on update no action on delete no action 
go
Alter table [Product_Info] add  foreign key([Cat_ID]) references [Category] ([Cat_ID])  on update no action on delete no action 
go
Alter table [Product_Info] add  foreign key([Brand_ID]) references [Brand] ([Brand_ID])  on update no action on delete no action 
go
Alter table [AD_Lookup] add  foreign key([AutDir_ID]) references [Author_Director] ([AutDir_ID])  on update no action on delete no action 
go
Alter table [Media_Lookup] add  foreign key([Media_ID]) references [Media] ([Media_ID])  on update no action on delete no action 
go
Alter table [Feature_Lookup] add  foreign key([Color_ID]) references [Color] ([Color_ID])  on update no action on delete no action 
go
Alter table [Feature_Lookup] add  foreign key([Size_ID]) references [Size] ([Size_ID])  on update no action on delete no action 
go
Alter table [Type_Lookup] add  foreign key([Type_ID]) references [Type] ([Type_ID])  on update no action on delete no action 
go
Alter table [Order_Master] add  foreign key([Customer_ID]) references [Customer_Master] ([Customer_ID])  on update no action on delete no action 
go
Alter table [Customer_Master] add  foreign key([Degree_ID]) references [Degree_Lookup] ([Degree_ID])  on update no action on delete no action 
go
Alter table [Customer_Master] add  foreign key([Income_ID]) references [Income_Lookup] ([Income_ID])  on update no action on delete no action 
go
Alter table [Customer_Master] add  foreign key([CreditCard_ID]) references [CreditCard_Lookup] ([CreditCard_ID])  on update no action on delete no action 
go
Alter table [Customer_Master] add  foreign key([StreetType_ID]) references [StreetType_Lookup] ([StreetType_ID])  on update no action on delete no action 
go
Alter table [Order_Details] add  foreign key([Order_ID]) references [Order_Master] ([Order_ID])  on update no action on delete no action 
go
Alter table [Product_Info] add  foreign key([Makeup_Attribute_ID]) references [Makeup_Attributes] ([Makeup_Attribute_ID])  on update no action on delete no action 
go
Alter table [Product_Info] add  foreign key([Supplier_ID]) references [Supplier] ([Supplier_ID])  on update no action on delete no action 
go
Alter table [Feature_Lookup] add  foreign key([Format_ID]) references [Format] ([Format_ID])  on update no action on delete no action 
go


Set quoted_identifier on
go


Set quoted_identifier off
go


/* Roles permissions */


/* Users permissions */


