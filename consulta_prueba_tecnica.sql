SELECT ticket_details_202302101644.material_id, (ticket_details_202302101644.quantity_sum - purchase_order_details_202302101644.quantity_sum) as Difference
from 
(SELECT material_id, sum(quantity) AS quantity_sum
 from ticket_details_202302101644
 group by material_id) ticket_details_202302101644,
 (select material_id, sum(quantity) as quantity_sum
  from purchase_order_details_202302101644
  group by material_id) purchase_order_details_202302101644
 where ticket_details_202302101644.material_id = purchase_order_details_202302101644.material_id;