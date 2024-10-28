import { FileItem } from '../models/file-item.model';

export let MOCK_FILE_ITEMS: FileItem[] = [
  new FileItem(
    1,
    'Music',
    new Date(2023, 11 - 1, 11, 13, 50, 23),
    new Date(2023, 11 - 1, 11, 13, 50, 23),
    true,
  ),
  new FileItem(
    2,
    'Pictures',
    new Date(2023, 10 - 1, 21, 13, 50, 23),
    new Date(2023, 10 - 1, 21, 13, 50, 23),
    true,
  ),
  new FileItem(
    3,
    'Mobile Data',
    new Date(2023, 10 - 1, 1, 13, 50, 23),
    new Date(2023, 10 - 1, 1, 13, 50, 23),
    true,
  ),
  new FileItem(
    4,
    'vacation_notes.txt',
    new Date(2023, 6 - 1, 17, 13, 50, 23),
    new Date(2023, 6 - 1, 17, 13, 50, 23),
    false,
    4000,
  ), // in Personal notes folder
  new FileItem(
    5,
    'programming_notes.txt',
    new Date(2023, 6 - 1, 25, 13, 50, 23),
    new Date(2023, 6 - 1, 25, 13, 50, 23),
    false,
    5000,
  ), // in Personal notes folder
  new FileItem(
    6,
    'feedback.txt',
    new Date(2023, 6 - 1, 3, 13, 50, 23),
    new Date(2023, 6 - 1, 3, 13, 50, 23),
    false,
    6000,
  ), // in Music folder
  new FileItem(
    7,
    'ferry-receipt.pdf',
    new Date(2023, 1 - 1, 3, 13, 50, 23),
    new Date(2023, 1 - 1, 3, 13, 50, 23),
    false,
    7000,
  ),
  new FileItem(
    8,
    'fishingTrip_1.jpg',
    new Date(2023, 8 - 1, 1, 13, 50, 23),
    new Date(2023, 8 - 1, 1, 13, 50, 23),
    false,
    8000,
  ),
  new FileItem(
    9,
    'fishingTrip_2.jpg',
    new Date(2022, 11 - 1, 27, 13, 50, 23),
    new Date(2022, 11 - 1, 27, 13, 50, 23),
    false,
    9000,
  ),
  new FileItem(
    10,
    'fishingTrip_3.jpg',
    new Date(2021, 12 - 1, 22, 13, 50, 23),
    new Date(2021, 12 - 1, 22, 13, 50, 23),
    false,
    10000,
  ),
  new FileItem(
    11,
    'fishingTrip_4.jpg',
    new Date(2020, 12 - 1, 22, 13, 50, 23),
    new Date(2020, 12 - 1, 22, 13, 50, 23),
    false,
    11000,
  ),
  new FileItem(
    12,
    'fishingTrip_5.jpg',
    new Date(2021, 5 - 1, 20, 13, 50, 23),
    new Date(2021, 5 - 1, 20, 13, 50, 23),
    false,
    12000,
  ),
  new FileItem(
    13,
    'fishingTrip_6.jpg',
    new Date(2023, 3 - 1, 1, 13, 50, 23),
    new Date(2023, 3 - 1, 1, 13, 50, 23),
    false,
    13000,
  ),
  new FileItem(
    14,
    'fishingTrip_7.jpg.jpg',
    new Date(2023, 2 - 1, 28, 13, 50, 23),
    new Date(2023, 2 - 1, 28, 13, 50, 23),
    false,
    14000,
  ),
  new FileItem(
    15,
    'fishingTrip_lastimage.jpg',
    new Date(2024, 7 - 1, 1, 13, 50, 23),
    new Date(2024, 7 - 1, 1, 13, 50, 23),
    false,
    15000,
  ),
  new FileItem(
    16,
    'Fishing trip 2022',
    new Date(2024, 7 - 1, 5, 13, 50, 23),
    new Date(2024, 7 - 1, 5, 13, 50, 23),
    true,
    16000,
  ), // in Pictures folder
  new FileItem(
    17,
    'Personal notes',
    new Date(2021, 10 - 1, 5, 13, 50, 23),
    new Date(2021, 10 - 1, 5, 13, 50, 23),
    true,
    17000,
  ),
];
