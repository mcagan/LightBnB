-- INSERT INTO users
--  (name, email, password)
--   VALUES ('DAvid', 'dre', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'), ('Stevie', 'gmail', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'), ('Moira', 'mre', 'x$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

-- INSERT INTO properties (owner_id, title, thumbnail_photo_url, cover_photo_url, cost_per_night, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code)
-- VALUES (1, 'Chalet', 'https://pix6.agoda.net/hotelImages/232/2322450/2322450_17061018430053591680.jpg?s=1024x768', 'https://pix6.agoda.net/hotelImages/232/2322450/2322450_17061018430053591680.jpg?s=1024x768', 40, 2, 4, 'Canada', 'Rivard', 'Sherbrooke', 'QC', 'K8H5B2'), (2, 'Shop', 'https://vignette.wikia.nocookie.net/schitts-creek/images/0/04/ETk295dWkAAAJfx.jpg/revision/latest?cb=20200320200228', 'https://vignette.wikia.nocookie.net/schitts-creek/images/0/04/ETk295dWkAAAJfx.jpg/revision/latest?cb=20200320200228', 20, 0, 0, 'Canada', 'bob', 'Schitts Creek', 'ON', 'J9K0L3'), (3, 'Motel', 'https://vignette.wikia.nocookie.net/schitts-creek/images/2/2b/RosebudMotel.png/revision/latest?cb=20180320211242', 'https://vignette.wikia.nocookie.net/schitts-creek/images/2/2b/RosebudMotel.png/revision/latest?cb=20180320211242', 60, 1, 2, 'Canada', 'rosebud', 'Schitts Creek', 'ON', 'J9K0L3');

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES (TO_DATE('01/12/2015', 'DD/MM/YYYY'), TO_DATE('09/12/2015', 'DD/MM/YYYY'), 1, 4), (TO_DATE('01/12/2019', 'DD/MM/YYYY'), TO_DATE('06/12/2019', 'DD/MM/YYYY'), 2, 2), (TO_DATE('01/04/2020', 'DD/MM/YYYY'), TO_DATE('18/04/2020', 'DD/MM/YYYY'), 3, 5);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message) VALUES (4, 1, 1, 4, 'message1'), (2, 2, 2, 2, 'message2'), (5, 3, 3, 5, 'message3');