CREATE  VIEW `vw_candidate_scores` AS
    SELECT 
          tb2.id_candidate AS id_candidate
        , tb2.name AS name
        , tb2.id_job AS id_job
        , tb2.skill AS skill
        , tb2.profile_candidate AS profile_candidate
        , tb2.profile_job AS profile_job
        , tb2.weight AS weight
    FROM
        (SELECT 
            tb1.id_candidate AS id_candidate,
                  tb3.name AS name
                , tb1.id_job AS id_job
                , tb1.skill AS skill
                , tb1.profile AS profile_candidate
                , tb2.profile AS profile_job
                , tb2.weight AS weight
        FROM
            ((`candidates` tb1
        LEFT JOIN `skills` tb2 ON ((tb1.skill = tb2.skill)))
        LEFT JOIN `users` tb3 ON ((tb1.id_candidate = tb3.id)))
        GROUP BY tb1.id_candidate , tb1.id_job , tb1.skill) tb2