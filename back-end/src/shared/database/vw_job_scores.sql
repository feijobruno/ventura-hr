CREATE  VIEW `vw_job_scores` AS
    SELECT
          concat(tb5.id_job,tb5.id_candidate) AS id_score
        , tb5.id_candidate AS id_candidate
        , tb5.name AS name
        , tb5.id_job AS id_job
        , tb5.title AS title
        , round((tb5.profile_job / tb5.weight_job),2) AS score_job
        , round((tb5.profile_candidate / tb5.weight_job),2) AS score
        , rank() OVER (PARTITION BY tb5.id_job ORDER BY (tb5.profile_candidate / tb5.weight_job) desc )  AS candidate_rank

    FROM (
        SELECT 
              tb1.id_candidate AS id_candidate
            , tb3.name AS name,tb1.id_job AS id_job
            , tb4.title AS title
            , sum((tb1.profile * tb2.profile)) AS profile_candidate
            , sum((tb2.profile * tb2.weight)) AS profile_job
            , sum(tb2.weight) AS weight_job    
        FROM (((candidates tb1 
        LEFT JOIN `skills` tb2 ON((tb1.skill = tb2.skill))) 
        LEFT JOIN `users` tb3 ON((tb1.id_candidate = tb3.id)))
        LEFT JOIN `jobs` tb4 ON((tb1.id_job = tb4.id)))
        GROUP BY tb1.id_candidate,tb1.id_job) tb5

