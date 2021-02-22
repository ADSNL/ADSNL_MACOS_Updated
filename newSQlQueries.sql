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
select BD.Number, BD.Title, BD.Price, BD.CatCount
from (
	select pi.Prod_SKU as Number, pi.Prod_Name as Title, ml.Media_Price as Price,
	(select count(*) from Product_Info where Dept_ID = 1) as CatCount,
	ROW_NUMBER() over (order by pi.Prod_SKU) as RowNum
	from Product_Info as pi join Media_Lookup as ml
	on pi.Prod_SKU = ml.Prod_SKU
	where pi.Dept_ID = 1
) as BD 
--WHERE BD.RowNum BETWEEN `+ startRange + `and ` + endRange


--query to get clothing for category page
select C.Number, C.Title, C.Price, C.CatCount
	from (
		select pi.Prod_SKU as Number, pi.Prod_Name as Title, pi.Prod_Price as Price,
		(select count(*) from Product_Info where Dept_ID = 2) as CatCount,
		ROW_NUMBER() over (order by pi.Prod_SKU) as RowNum
		from Product_Info as pi
		where pi.Dept_ID = 2
	) as C
	--WHERE C.RowNum BETWEEN `+ startRange + `and ` + endRange

--query to get movies for category page
select M.Number, M.Title, M.Price, M.CatCount
	from (	select pi.Prod_SKU as Number, pi.Prod_Name as Title, fl.Feature_Price as Price,
			(select count(*) from Product_Info where Dept_ID = 5) as CatCount, 
			ROW_NUMBER() over (order by pi.Prod_SKU) as RowNum
			from Product_Info as pi join Feature_Lookup as fl
			on pi.Prod_SKU = fl.Prod_SKU 
			where pi.Dept_ID = 5
		) as M
	--WHERE M.RowNum BETWEEN `+ startRange + `and ` + endRange


--query to kitchen for category page
select K.Number, K.Title, K.Price, K.CatCount
from (
		select pi.Prod_SKU as Number, pi.Prod_Name as Title, tl.Type_Price as Price,
		(select count(*) from Product_Info where Dept_ID = 4) as CatCount,
			ROW_NUMBER() over (order by pi.Prod_SKU) as RowNum
			from Product_Info as pi join Type_Lookup as tl
			on pi.Prod_SKU = tl.Prod_SKU
			where pi.Dept_ID = 4
	) as K
	--WHERE K.RowNum BETWEEN `+ startRange + `and ` + endRange


--query to get makeup for category page
select M.Number, M.Title, M.Price, M.CatCount
	from (
		select pi.Prod_SKU as Number, pi.Prod_Name as Title, fl.Feature_Price as Price,
		(select count(*) from Product_Info where Dept_ID = 3) as CatCount,
		ROW_NUMBER() over (order by pi.Prod_SKU) as RowNum
		from Product_Info as pi join Feature_Lookup as fl
		on pi.Prod_SKU = fl.Prod_SKU
		where pi.Dept_ID = 3
	) as M
	--WHERE M.RowNum BETWEEN `+ startRange + `and ` + endRange


--query to get pets for category page
select P.Number, P.Title, P.Price, P.CatCount
 from (
	select pi.Prod_SKU as Number, pi.Prod_Model_Number as Title, pi.Prod_Price as Price,
		(select count(*) from Product_Info where Dept_ID = 6) as CatCount
	from Product_Info as pi
	where Dept_ID = 6
 ) as P
 --WHERE P.RowNum BETWEEN `+ startRange + `and ` + endRange

--query to get search results
