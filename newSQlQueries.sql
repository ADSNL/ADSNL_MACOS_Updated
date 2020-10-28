
--query to get top 4 books data
select top 4
    pi.Prod_SKU as SKU, pi.Dept_ID as deptID, pi.Prod_Name as Title, pi.Prod_ISBN_10 as Number, ml.Media_Price as Price
from Product_Info as pi join Media_Lookup as ml
    on ml.Prod_SKU = pi.Prod_SKU
where pi.Dept_ID = 1


--query to get top 4 clothing data
select top 4
    pi.Prod_SKU as SKU, pi.Dept_ID as deptID, pi.Prod_Name as Title, pi.Prod_Price as Price
from Product_Info as pi
where pi.Dept_ID = 2;

--query to get top 4 movies
select top 4
    pi.Prod_SKU as Movie_Genre_Name, pi.Prod_Name as Movie_Title
from Product_Info as pi
where Dept_ID = 5;

--query to get books for category page.
select bd.Prod_SKU as SKU, bd.Title, bd.Number, bd.Prod_ISBN_13, bd.Price,
    (select count(distinct Product_Info.Prod_SKU)
    from Product_Info
        join Media_Lookup
        on Product_Info.Prod_SKU = Media_Lookup.Prod_SKU) as CatCount
from (
				select Product_Info.Prod_SKU, Product_Info.Prod_Name as Title, Product_Info.Prod_ISBN_10 as Number,
        Product_Info.Prod_ISBN_13, min(Media_Price) as Price,
        ROW_NUMBER() over (order by Product_Info.Prod_SKU) as RowNum
    from Product_Info join dbo.Media_Lookup
        on Product_Info.Prod_SKU = Media_Lookup.Prod_SKU
    group by Product_Info.Prod_SKU, Product_Info.Prod_Name, Product_Info.Prod_ISBN_10, Product_Info.Prod_ISBN_13
			) as bd
--WHERE BD.RowNum BETWEEN


--query to get clothing for category page
select C.Number, C.Title, C.Price, C.CatCount
from (
		select Prod_SKU as Number, Prod_Name as Title, Prod_Price as Price,
        (select count(*)
        from Product_Info
        where Dept_ID = 2) as CatCount,
        ROW_NUMBER() over (order by Product_Info.Prod_SKU) as RowNum
    from Product_Info
    where Dept_ID = 2
	) as C

