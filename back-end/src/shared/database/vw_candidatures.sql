CREATE VIEW `vw_candidatures` AS
       SELECT 
              tb1.id_candidate AS id_candidate
            , tb1.id_job AS id_job
            , tb2.title
            , tb2.description
            , tb2.company
            , tb2.city
            , tb2.uf
            , CASE
				        WHEN tb3.id_candidate = tb1.id_candidate THEN "Sim"
				      ELSE "Não"
			END as status
	  FROM `candidates` tb1
        LEFT JOIN `jobs` tb2 ON (tb1.id_job = tb2.id)
        LEFT JOIN `recruitments` tb3 ON (tb1.id_candidate = tb3.id_candidate and tb1.id_job = tb3.id_job)
        GROUP BY 
		  tb1.id_candidate
        , tb1.id_job