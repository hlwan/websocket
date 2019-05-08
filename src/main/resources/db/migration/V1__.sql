create table camera_analyse(
  id text primary key not null,
  analyse_time text not null,
  camera text not null,
  content text not null
);

create unique index camera_time_camera on camera_analyse(analyse_time,camera);