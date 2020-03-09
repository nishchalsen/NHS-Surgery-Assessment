DROP DATABASE survey;

CREATE DATABASE survey;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

USE survey;

--
-- Database: `survey`
--

-- --------------------------------------------------------

--
-- Table structure for table `answer`
--

CREATE TABLE `answer` (
  `responseID` int(11) NOT NULL,
  `patientID` int(11) NOT NULL,
  `questionID` int(11) NOT NULL,
  `answer` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `answer`
--

INSERT INTO `answer` (`responseID`, `patientID`, `questionID`, `answer`) VALUES
(1, 2, 1, 'yes'),
(1, 2, 2, 'peanut'),
(1, 2, 3, 'Lactose Intolerance'),
(1, 2, 4, 'none'),
(1, 2, 5, 'yes'),
(1, 2, 6, 'yes'),
(1, 2, 7, 'warfarin'),
(1, 2, 8, 'yes'),
(1, 2, 9, 'Metformin'),
(1, 2, 10, 'yes'),
(1, 2, 11, 'yes'),
(1, 2, 12, 'ACE inhibitors'),
(1, 2, 13, 'yes'),
(1, 2, 14, 'no'),
(1, 2, 15, 'yes'),
(1, 2, 16, 'yes'),
(1, 2, 17, 'no'),
(1, 2, 18, 'yes'),
(1, 2, 19, 'no'),
(1, 2, 20, 'no'),
(1, 2, 21, 'no'),
(1, 2, 22, 'yes'),
(1, 2, 23, 'no'),
(1, 2, 24, 'yes'),
(1, 2, 25, 'no'),
(1, 2, 26, 'no'),
(1, 2, 27, 'no'),
(1, 2, 28, 'no'),
(1, 2, 29, 'no'),
(1, 2, 30, 'no'),
(1, 2, 31, 'no'),
(1, 2, 32, 'yes'),
(1, 2, 33, 'MG'),
(1, 2, 34, 'yes'),
(1, 2, 35, 'lupus'),
(1, 2, 36, 'yes'),
(1, 2, 37, 'seizures'),
(1, 2, 38, 'no'),
(1, 2, 39, 'no'),
(1, 2, 40, 'no'),
(1, 2, 41, 'no'),
(1, 2, 42, 'no'),
(1, 2, 43, 'no'),
(1, 2, 44, 'no'),
(1, 2, 45, 'no'),
(1, 2, 46, 'no'),
(1, 2, 47, 'no'),
(1, 2, 48, ''),
(1, 2, 49, '');

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `feedbackID` int(11) NOT NULL,
  `patientID` int(11) NOT NULL,
  `feedbackQuestionID` int(11) NOT NULL,
  `feedback` int(11) NOT NULL,
  `comment` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`feedbackID`, `patientID`, `feedbackQuestionID`, `feedback`, `comment`) VALUES
(1, 2, 1, 5, NULL),
(1, 2, 2, 4, NULL),
(1, 2, 3, 5, NULL),
(1, 2, 4, 4, NULL),
(1, 2, 5, 4, NULL),
(2, 3, 1, 5, NULL),
(2, 3, 2, 4, NULL),
(2, 3, 3, 5, NULL),
(2, 3, 4, 4, NULL),
(2, 3, 5, 4, NULL),
(3, 4, 1, 5, NULL),
(3, 4, 2, 4, NULL),
(3, 4, 3, 5, NULL),
(3, 4, 4, 4, NULL),
(3, 4, 5, 4, NULL),
(4, 6, 1, 5, NULL),
(4, 6, 2, 4, NULL),
(4, 6, 3, 5, NULL),
(4, 6, 4, 4, NULL),
(4, 6, 5, 4, NULL),
(5, 8, 1, 5, NULL),
(5, 8, 2, 4, NULL),
(5, 8, 3, 5, NULL),
(5, 8, 4, 4, NULL),
(5, 8, 5, 4, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `feedbackQuestion`
--

CREATE TABLE `feedbackQuestion` (
  `feedbackQuestionID` int(11) NOT NULL,
  `feedbackQuestion` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `feedbackQuestion`
--

INSERT INTO `feedbackQuestion` (`feedbackQuestionID`, `feedbackQuestion`) VALUES
(1, 'You signed in using the self-check in kiosk and found it easy to use'),
(2, 'The POAC waiting area was comfortable'),
(3, 'You were kept informed and received all the information/instructions you needed'),
(4, 'You were able to complete the screening questions on the iPad/mobile device'),
(5, 'You would recommend our POAC service to friends and family');

-- --------------------------------------------------------

--
-- Table structure for table `feedbackResponse`
--

CREATE TABLE `feedbackResponse` (
  `feedbackID` int(11) NOT NULL,
  `patientID` int(11) NOT NULL,
  `startTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `completeTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `feedbackResponse`
--

INSERT INTO `feedbackResponse` (`feedbackID`, `patientID`, `startTime`, `completeTime`) VALUES
(1, 2, '2019-02-17 20:55:34', '2019-02-17 21:04:34'),
(2, 3, '2019-02-18 20:55:34', '2019-02-18 21:04:34'),
(3, 4, '2019-02-20 20:55:34', '2019-02-20 21:04:34'),
(4, 6, '2019-02-22 20:55:34', '2019-02-22 21:04:34'),
(5, 8, '2019-02-28 20:55:34', '2019-02-28 21:04:34');

-- --------------------------------------------------------

--
-- Table structure for table `nhsUsers`
--

CREATE TABLE `nhsUsers` (
  `userID` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `hashedPassword` varchar(100) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `userRoleID` int(11) NOT NULL,
  `statusID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `nhsUsers`
--

INSERT INTO `nhsUsers` (`userID`, `username`, `hashedPassword`, `phone`, `email`, `firstname`, `lastname`, `userRoleID`, `statusID`) VALUES
(1, 'djuniper0', '$2b$10$.nTdltQzSa9m7aeLxbdlaeq8GpLI8rfSVygvF/JVvDZ52jBRXaDc6', '+447123456789', 'mmollitt0@example.com', 'Micaela', 'Mollitt', 1, 1),
(2, 'adehooch1', '$2b$10$.nTdltQzSa9m7aeLxbdlaeq8GpLI8rfSVygvF/JVvDZ52jBRXaDc6', '+447123456780', 'switterick1@businessinsider.com', 'Saloma', 'Witterick', 2, 1),
(3, 'mcloke2', '$2b$10$.nTdltQzSa9m7aeLxbdlaeq8GpLI8rfSVygvF/JVvDZ52jBRXaDc6', '+447123456781', 'habella2@wikia.com', 'Hervey', 'Abella', 2, 2),
(4, 'bwillgoose3', '$2b$10$.nTdltQzSa9m7aeLxbdlaeq8GpLI8rfSVygvF/JVvDZ52jBRXaDc6', '+447123456782', 'mscotchmoor3@newsvine.com', 'Mariejeanne', 'Scotchmoor', 2, 1),
(5, 'neckh4', '$2b$10$.nTdltQzSa9m7aeLxbdlaeq8GpLI8rfSVygvF/JVvDZ52jBRXaDc6', '+447123456783', 'mdayly4@stanford.edu', 'Mikael', 'Dayly', 1, 2),
(6, 'tslocombe5', '$2b$10$.nTdltQzSa9m7aeLxbdlaeq8GpLI8rfSVygvF/JVvDZ52jBRXaDc6', '+447123456784', 'gstickells5@tmall.com', 'Gaylor', 'Stickells', 1, 2),
(7, 'atoner6', '$2b$10$.nTdltQzSa9m7aeLxbdlaeq8GpLI8rfSVygvF/JVvDZ52jBRXaDc6', '+447123456785', 'dvallentine6@indiegogo.com', 'Devin', 'Vallentine', 1, 1),
(8, 'gconers7', '$2b$10$.nTdltQzSa9m7aeLxbdlaeq8GpLI8rfSVygvF/JVvDZ52jBRXaDc6', '+447123456786', 'finott7@vinaora.com', 'Fey', 'Inott', 2, 2),
(9, 'arembrandt8', '$2b$10$.nTdltQzSa9m7aeLxbdlaeq8GpLI8rfSVygvF/JVvDZ52jBRXaDc6', '+447123456787', 'lcolenutt8@china.com.cn', 'Leoine', 'Colenutt', 1, 2),
(10, 'dgrayshon9', '$2b$10$.nTdltQzSa9m7aeLxbdlaeq8GpLI8rfSVygvF/JVvDZ52jBRXaDc6', '+447123456788', 'fleuty9@mac.com', 'Felike', 'Leuty', 2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

CREATE TABLE `patient` (
  `patientID` int(11) NOT NULL,
  `NHSno` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `patient`
--

INSERT INTO `patient` (`patientID`, `NHSno`, `phone`, `email`, `firstname`, `lastname`) VALUES
(1, '1637011649199', '04285 180496', 'in.faucibus.orci@tinciduntvehicularisus.ca', 'Alice', 'Winters'),
(2, '1612010321699', '02768 252527', 'lobortis@tempor.com', 'Iona', 'Shields'),
(3, '1694040261299', '01267 578376', 'fringilla.porttitor.vulputate@tortordictumeu.net', 'Aladdin', 'Malone'),
(4, '1618101810499', '07012 748840', 'ridiculus.mus.Aenean@volutpatornare.ca', 'Allegra', 'Beasley'),
(5, '1699040672699', '05425 251715', 'Donec@ligula.co.uk', 'Graham', 'Arnold'),
(6, '1600061346399', '00210 674886', 'purus.in@enimNunc.com', 'Hope', 'Myers'),
(7, '1669080288099', '00100 535472', 'sapien.cursus.in@lobortis.co.uk', 'Ivory', 'Saunders'),
(8, '1622021215099', '03194 525703', 'blandit.at@velit.net', 'Yen', 'Myers'),
(9, '1665010931299', '00969 538005', 'pede.malesuada@etrisusQuisque.co.uk', 'Ashton', 'Mckinney'),
(10, '1624100643799', '08481 243389', 'tortor.at.risus@rhoncusProin.edu', 'Alana', 'Gordon'),
(11, '1630112737499', '06683 210255', 'lacus@quamdignissim.org', 'Bell', 'Hester'),
(12, '1662110293699', '00303 630467', 'non.feugiat@risus.com', 'Nina', 'Stokes'),
(13, '1602102746899', '04436 057415', 'a@magnaUt.ca', 'Ina', 'Green'),
(14, '1681082177499', '07377 371774', 'Vivamus.nibh.dolor@blanditcongueIn.edu', 'Tashya', 'Benton'),
(15, '1683032830799', '05084 776916', 'eget.venenatis@metusfacilisislorem.edu', 'Morgan', 'Wiggins'),
(16, '1691041000899', '00724 062559', 'libero.lacus@sapienCrasdolor.edu', 'Casey', 'Atkins'),
(17, '1608031829899', '07128 387884', 'natoque.penatibus@estMauriseu.net', 'Ryder', 'Gilbert'),
(18, '1615072673799', '00201 141489', 'pede.nec@ornare.org', 'Rhoda', 'Cain'),
(19, '1640061497099', '01457 206200', 'dolor@sodaleseliterat.ca', 'Oren', 'Forbes'),
(20, '1665092164499', '04488 548809', 'Maecenas@ridiculusmus.net', 'Geoffrey', 'Golden'),
(21, '1602110764399', '03303 049670', 'purus.ac.tellus@euligulaAenean.edu', 'Jasmine', 'Daniel'),
(22, '1667121461999', '03561 538781', 'nulla.vulputate.dui@at.com', 'Salvador', 'Dunlap'),
(23, '1674071916599', '05915 077511', 'egestas.Fusce.aliquet@molestie.ca', 'Laurel', 'Brooks'),
(24, '1692031037499', '01685 786825', 'mollis@tellusnonmagna.net', 'Barbara', 'Robertson'),
(25, '1628070581499', '02700 679115', 'vel.faucibus@lorem.com', 'Ainsley', 'Kim'),
(26, '1693032565999', '06110 275317', 'ante.Nunc@Class.co.uk', 'Gavin', 'Kidd'),
(27, '1662020322199', '01396 543949', 'eleifend@vulputateullamcorpermagna.edu', 'Sydnee', 'Lynn'),
(28, '1625032900899', '09514 464912', 'urna.convallis@bibendumsedest.net', 'Marshall', 'Campos'),
(29, '1696091329899', '09287 908888', 'dis.parturient@id.org', 'Emerson', 'Delaney'),
(30, '1600051040399', '03249 005911', 'non.leo.Vivamus@vehiculaet.ca', 'Kai', 'Hopper'),
(31, '1686041767299', '07841 332131', 'nisl@nullaat.ca', 'Karen', 'Jordan'),
(32, '1628041938299', '04509 632196', 'luctus.aliquet@nuncIn.ca', 'Hayfa', 'Scott'),
(33, '1619112167499', '06794 123107', 'Suspendisse.eleifend.Cras@arcu.com', 'Bianca', 'Deleon'),
(34, '1620102051499', '04554 492864', 'et@lectusantedictum.org', 'Rachel', 'White'),
(35, '1612120738499', '04275 571737', 'egestas@tincidunt.net', 'Amethyst', 'Ford'),
(36, '1607072661599', '06854 447364', 'conubia.nostra.per@metusAeneansed.co.uk', 'Hermione', 'Charles'),
(37, '1688012177599', '09412 912201', 'gravida@justo.org', 'Quinn', 'Hayden'),
(38, '1640071862399', '03142 503326', 'nibh@hendreritDonec.org', 'Laurel', 'Steele'),
(39, '1613121076899', '09953 313684', 'vestibulum@idnunc.com', 'Mercedes', 'Mccullough'),
(40, '1626022944199', '02100 165689', 'placerat.eget.venenatis@gravidanuncsed.org', 'Shelley', 'Tran'),
(41, '1636081959399', '05731 463660', 'lectus@posuerecubilia.co.uk', 'Wendy', 'Zimmerman'),
(42, '1662081751999', '01519 066607', 'orci@anteNunc.ca', 'Hector', 'Anderson'),
(43, '1646030930299', '00826 536616', 'In.tincidunt.congue@ornareFuscemollis.ca', 'Elijah', 'Horn'),
(44, '1607010158699', '08049 672868', 'Nullam.nisl.Maecenas@miloremvehicula.ca', 'Eve', 'Jacobs'),
(45, '1690082213299', '09449 441040', 'neque.et@dictumProin.edu', 'Halla', 'Sheppard'),
(46, '1635062626199', '04735 233838', 'eget@sem.net', 'Christopher', 'Gould'),
(47, '1620061933199', '08456 558440', 'sociis.natoque@AliquamnislNulla.net', 'Tiger', 'Charles'),
(48, '1609121008899', '09752 749057', 'velit@rutrumeuultrices.edu', 'Martina', 'Pruitt'),
(49, '1614072132399', '02417 805920', 'convallis.ligula@lacusvarius.net', 'Jaime', 'Haney'),
(50, '1668051111299', '09932 484115', 'magna@aliquet.net', 'Wing', 'Munoz'),
(51, '1618090173699', '00871 488517', 'lacus.Quisque.purus@in.co.uk', 'Jeremy', 'Head'),
(52, '1665051215799', '05012 565798', 'dis.parturient.montes@blanditmattisCras.ca', 'Joy', 'Guerrero'),
(53, '1604110948899', '06073 005649', 'feugiat.Lorem.ipsum@liberomauris.org', 'Cynthia', 'Woodward'),
(54, '1642040749199', '09987 933417', 'gravida.molestie@ridiculusmusDonec.org', 'Blaze', 'Coffey'),
(55, '1604110690299', '03897 236303', 'ullamcorper.Duis@felisDonectempor.net', 'Nell', 'Maddox'),
(56, '1641090756999', '00830 048496', 'nunc.Quisque@Aliquamnecenim.edu', 'Quin', 'Sloan'),
(57, '1630050165799', '02991 470728', 'diam@egestas.com', 'Karly', 'Cohen'),
(58, '1665102605099', '00709 001741', 'augue.id.ante@dignissimpharetraNam.org', 'Chiquita', 'Franks'),
(59, '1662072775599', '09594 164353', 'et.arcu@malesuadautsem.ca', 'Jarrod', 'Levine'),
(60, '1688051827399', '00467 495108', 'lorem@diamdictum.net', 'Jin', 'Branch'),
(61, '1612120263299', '06621 096982', 'est.tempor@eutellusPhasellus.ca', 'Joshua', 'Pierce'),
(62, '1666092608299', '00503 496294', 'urna.Nunc@Vivamusnonlorem.com', 'Candace', 'Gomez'),
(63, '1617022300899', '09300 830601', 'dictum.placerat.augue@quis.edu', 'India', 'Cabrera'),
(64, '1621071217099', '01382 286641', 'augue.ut.lacus@estNunc.com', 'Maile', 'Blanchard'),
(65, '1613111521199', '09125 738431', 'Duis.risus@liberoMorbiaccumsan.org', 'Victor', 'Espinoza'),
(66, '1612081751299', '01533 055746', 'lobortis.nisi@ascelerisque.co.uk', 'Courtney', 'Booker'),
(67, '1609030161799', '09150 284772', 'tempus.eu@consequat.co.uk', 'Devin', 'Lowery'),
(68, '1622051724399', '04502 599628', 'sem.eget.massa@magna.com', 'Yasir', 'Mullen'),
(69, '1622010838399', '09187 805663', 'a.auctor.non@nislsem.ca', 'Sophia', 'Rowland'),
(70, '1630023031099', '04474 420412', 'dolor@posuerevulputate.co.uk', 'Kasimir', 'Branch'),
(71, '1646122247399', '05317 759803', 'Fusce.mollis.Duis@ligulaAeneaneuismod.ca', 'Victoria', 'Scott'),
(72, '1685040811499', '08540 630055', 'nulla@disparturient.edu', 'Omar', 'Crawford'),
(73, '1685042782899', '08261 545899', 'mollis.dui@augue.edu', 'Winifred', 'Jacobs'),
(74, '1613122409499', '03576 486401', 'lorem.ut@lacinia.ca', 'Phoebe', 'Combs'),
(75, '1649010918899', '02173 683904', 'suscipit.nonummy@odiosempercursus.org', 'Kieran', 'Livingston'),
(76, '1621020671799', '02746 946127', 'dolor.quam@enimEtiamimperdiet.ca', 'Sarah', 'Garza'),
(77, '1695042912799', '03784 659584', 'erat.Etiam.vestibulum@purus.net', 'Reese', 'Conley'),
(78, '1614052919599', '02905 354732', 'Nulla.semper@sociosquad.org', 'Thane', 'Rollins'),
(79, '1614033037499', '07795 326660', 'pede@id.org', 'Mikayla', 'Armstrong'),
(80, '1636032500099', '06383 310154', 'ultricies@Donec.com', 'Elmo', 'Charles'),
(81, '1695050566499', '08992 273224', 'elit@amet.org', 'Kimberley', 'Sanchez'),
(82, '1691120977599', '03567 465342', 'adipiscing.lacus@Praesenteu.com', 'Gwendolyn', 'Wood'),
(83, '1602050882499', '06637 749823', 'varius.orci@vehiculaPellentesquetincidunt.co.uk', 'Jonas', 'Kidd'),
(84, '1683071528999', '04693 175954', 'enim@lectus.co.uk', 'Courtney', 'Allen'),
(85, '1615110440599', '07539 464126', 'a.enim@nonbibendum.co.uk', 'Whoopi', 'Glover'),
(86, '1652111096999', '01601 470288', 'adipiscing@pharetraut.edu', 'Ferdinand', 'Stein'),
(87, '1676102533499', '00512 687498', 'mauris@nonmagnaNam.co.uk', 'Francesca', 'Gutierrez'),
(88, '1638042343299', '08337 427381', 'in@netus.ca', 'Heidi', 'Banks'),
(89, '1677092324899', '05126 085809', 'Cras.convallis.convallis@Suspendisse.ca', 'Guinevere', 'Hodges'),
(90, '1693100977199', '03353 721644', 'a.nunc.In@in.edu', 'Sopoline', 'Henry'),
(91, '1637060313099', '08317 856539', 'pellentesque.tellus.sem@ligulaNullamenim.ca', 'Hayfa', 'Mclean'),
(92, '1680072179199', '03356 411384', 'egestas.Fusce.aliquet@elitEtiamlaoreet.edu', 'Freya', 'Skinner'),
(93, '1656031845099', '02568 538672', 'montes.nascetur@seddictumeleifend.co.uk', 'Hedley', 'Gibson'),
(94, '1635060527299', '07727 706398', 'Nam.ac.nulla@Sed.com', 'Merritt', 'French'),
(95, '1629070644199', '01369 743658', 'non.egestas.a@erateget.edu', 'Odysseus', 'Sutton'),
(96, '1628122331499', '02507 040217', 'suscipit.est@scelerisque.org', 'Dalton', 'Brock'),
(97, '1660031621199', '00490 946702', 'eget@estNunclaoreet.co.uk', 'Lucian', 'Mcguire'),
(98, '1648112773899', '07400 257222', 'id.nunc.interdum@aliquet.com', 'Amery', 'Duffy'),
(99, '1684041899399', '06978 599733', 'Etiam.imperdiet@Donecvitae.ca', 'Len', 'Alexander'),
(100, '1625062644499', '06586 893007', 'volutpat.Nulla@non.net', 'Sharon', 'Levy');

-- --------------------------------------------------------

--
-- Table structure for table `permission`
--

CREATE TABLE `permission` (
  `permissionID` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `permission`
--

INSERT INTO `permission` (`permissionID`, `name`) VALUES
(1, 'add and remove NHS users, view patient survey, edit survey questions'),
(2, 'view patient survey, edit survey questions');

-- --------------------------------------------------------

--
-- Table structure for table `question`
--

CREATE TABLE `question` (
  `questionID` int(11) NOT NULL,
  `type` int(100) NOT NULL,
  `question` text NOT NULL,
  `parentQuestion` int(11) NOT NULL,
  `pos` int(11) NOT NULL,
  `editTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `question`
--

INSERT INTO `question` (`questionID`, `type`, `question`, `parentQuestion`, `pos`, `editTime`) VALUES
(1, 1, 'Do you have allergies / adverse reactions to food or medication?', 0, 1, '2019-02-02 21:07:36'),
(2, 2, 'Allergies', 1, 2, '2019-01-29 09:51:47'),
(3, 2, 'Adverse reaction', 1, 3, '2019-02-10 18:15:55'),
(4, 2, 'Other', 1, 4, '2019-02-03 01:32:20'),
(5, 1, 'Have you had a pre-operative appointment in the last 6 months?', 0, 5, '2019-01-01 17:38:11'),
(6, 1, 'Do you take any blood thinning medication?', 0, 6, '2019-02-16 10:02:31'),
(7, 2, 'medication', 6, 7, '2019-01-20 19:41:44'),
(8, 1, 'Do you have diabetes, which requires medication?', 0, 8, '2019-01-26 04:40:59'),
(9, 2, 'medication', 8, 9, '2019-02-04 22:10:05'),
(10, 1, 'Do you have high blood pressure?', 0, 10, '2019-02-09 20:18:40'),
(11, 1, 'Do you take medication for high blood pressure?', 10, 11, '2019-02-09 20:18:40'),
(12, 2, 'medication', 11, 12, '2019-02-09 20:18:40'),
(13, 1, 'Do you suffer from angina?', 0, 13, '2019-02-10 17:10:20'),
(14, 1, 'Do you suffer from chest pain?', 0, 14, '2019-02-10 17:10:20'),
(15, 1, 'Do you have a pacemaker?', 0, 15, '2019-01-29 15:21:23'),
(16, 1, 'Do you have asthma? ', 0, 16, '2019-01-23 18:37:43'),
(17, 2, 'Do you take anything other than standard inhalers?', 16, 17, '2019-01-16 05:33:32'),
(18, 1, 'Do you have COPD? ', 0, 18, '2019-01-23 18:37:43'),
(19, 2, 'Do you take anything other than standard inhalers?', 18, 19, '2019-01-16 05:33:32'),
(20, 1, 'Do you have sleep apnoea?', 0, 20, '2019-01-24 10:45:14'),
(21, 1, 'Have you ever had kidney disease?', 0, 21, '2019-02-03 22:37:29'),
(22, 1, 'Have you ever had kidney failure?', 0, 22, '2019-02-03 22:37:29'),
(23, 1, 'Do you have any thyroid issues?', 0, 23, '2019-02-10 23:04:48'),
(24, 2, 'Do you take medication for your thyroid?', 23, 24, '2019-02-10 23:04:48'),
(25, 1, 'Have you ever had a clot in your legs?', 0, 25, '2019-01-13 06:43:07'),
(26, 1, 'Have you ever had a clot in your lungs?', 0, 26, '2019-01-13 06:43:07'),
(27, 1, 'Do you or a family relative have a history of a bleeding disorder?', 0, 27, '2019-01-03 10:41:35'),
(28, 1, 'Do you or a family relative have a history of a clotting disorder?', 0, 28, '2019-01-03 10:41:35'),
(29, 1, 'Have you ever had a TIA?', 0, 29, '2019-01-22 01:44:10'),
(30, 1, 'Have you ever had a Stroke?', 0, 30, '2019-01-22 01:44:10'),
(31, 1, 'Do you have epilepsy? ', 0, 31, '2019-01-17 23:52:32'),
(32, 1, 'Do you have any diseases of the nerves or muscles? (eg MS, Myasthenia Gravis)', 0, 32, '2019-02-08 06:42:32'),
(33, 2, 'specify', 32, 33, '2019-02-04 19:36:45'),
(34, 1, 'Do you suffer with any immunology disorders?', 0, 34, '2019-01-12 16:58:26'),
(35, 2, 'specify', 34, 35, '2019-02-01 11:51:11'),
(36, 1, 'Have you or a blood relative ever had a serious problem with an anaesthetic? (not including nausea and vomiting)', 0, 36, '2019-02-16 05:43:06'),
(37, 2, 'specify', 36, 37, '2019-01-06 09:17:47'),
(38, 1, 'Do you regularly drink more than 30 units of alcohol per week?', 0, 38, '2019-02-05 17:07:41'),
(39, 1, 'Are you a SMOKER/Vaper?', 0, 39, '2019-01-17 12:41:43'),
(40, 1, 'Do you take HRT?', 0, 40, '2019-01-15 22:39:27'),
(41, 1, 'Do you take the Oral Contraceptive Pill?', 0, 41, '2019-01-15 22:39:27'),
(42, 1, 'Would you struggle to manage 2 flights of steps without stopping?', 0, 42, '2019-02-09 06:41:08'),
(43, 1, 'During the last 12 months have you lived abroad for more than 3 months?', 0, 43, '2019-01-19 14:22:43'),
(44, 1, 'During the last 12 months have you stayed in hospital overnight outside the uk?', 0, 44, '2019-02-16 17:29:51'),
(45, 1, 'During the last 12 month have you stayed in a uk hospital overnight, excluding MPH, Yeovil and Somerset community ', 0, 45, '2019-01-02 02:39:35'),
(46, 1, 'Have you ever been in a household or had ward contact of a known case of Carbapenemase Producing Enterobacteriaceae (CPE)', 0, 46, '2019-02-15 19:01:38'),
(47, 1, 'Have you ever been colonised or had an infection with CPE bacteria?', 0, 47, '2019-02-10 17:09:21'),
(48, 2, 'Is there any other information you would like to provide?', 0, 48, '2019-01-11 01:05:45'),
(49, 2, 'Please list your regular medication (not mentioned previously).', 0, 49, '2019-01-11 20:43:18');

-- --------------------------------------------------------

--
-- Table structure for table `questionType`
--

CREATE TABLE `questionType` (
  `typeID` int(11) NOT NULL,
  `type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `questionType`
--

INSERT INTO `questionType` (`typeID`, `type`) VALUES
(1, 'yes/no'),
(2, 'free text');

-- --------------------------------------------------------

--
-- Table structure for table `response`
--

CREATE TABLE `response` (
  `responseID` int(11) NOT NULL,
  `patientID` int(11) NOT NULL,
  `startTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `completeTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `response`
--

INSERT INTO `response` (`responseID`, `patientID`, `startTime`, `completeTime`) VALUES
(1, 2, '2019-02-17 20:35:33', '2019-02-17 20:58:33');

-- --------------------------------------------------------

--
-- Table structure for table `rolePermission`
--

CREATE TABLE `rolePermission` (
  `roleID` int(11) NOT NULL,
  `permissionID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `rolePermission`
--

INSERT INTO `rolePermission` (`roleID`, `permissionID`) VALUES
(1, 1),
(2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `signatureImage`
--

CREATE TABLE `signatureImage` (
  `rowID` int(11) NOT NULL,
  `imagePath` text NOT NULL,
  `patientID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `userRole`
--

CREATE TABLE `userRole` (
  `roleID` int(11) NOT NULL,
  `roleName` varchar(100) NOT NULL,
  `description` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `userRole`
--

INSERT INTO `userRole` (`roleID`, `roleName`, `description`) VALUES
(1, 'admin', 'admin staff'),
(2, 'nurse', 'nurses working in the hospital ');

-- --------------------------------------------------------

--
-- Table structure for table `workingStatus`
--

CREATE TABLE `workingStatus` (
  `statusID` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `workingStatus`
--

INSERT INTO `workingStatus` (`statusID`, `name`, `description`) VALUES
(1, 'active', 'current worker'),
(2, 'inactive', 'former worker');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `answer`
--
ALTER TABLE `answer`
  ADD PRIMARY KEY (`responseID`,`patientID`,`questionID`),
  ADD KEY `patientID` (`patientID`),
  ADD KEY `questionID` (`questionID`),
  ADD KEY `responseID` (`responseID`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`feedbackID`,`patientID`,`feedbackQuestionID`),
  ADD KEY `patientID` (`patientID`),
  ADD KEY `feedbackQuestionID` (`feedbackQuestionID`),
  ADD KEY `feedbackID` (`feedbackID`);

--
-- Indexes for table `feedbackQuestion`
--
ALTER TABLE `feedbackQuestion`
  ADD PRIMARY KEY (`feedbackQuestionID`);

--
-- Indexes for table `feedbackResponse`
--
ALTER TABLE `feedbackResponse`
  ADD PRIMARY KEY (`feedbackID`),
  ADD KEY `patientID` (`patientID`);

--
-- Indexes for table `nhsUsers`
--
ALTER TABLE `nhsUsers`
  ADD PRIMARY KEY (`userID`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `groupID` (`statusID`),
  ADD KEY `userRoleID` (`userRoleID`);

--
-- Indexes for table `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`patientID`),
  ADD UNIQUE KEY `NHSno` (`NHSno`);

--
-- Indexes for table `permission`
--
ALTER TABLE `permission`
  ADD PRIMARY KEY (`permissionID`);

--
-- Indexes for table `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`questionID`),
  ADD KEY `type` (`type`);

--
-- Indexes for table `questionType`
--
ALTER TABLE `questionType`
  ADD PRIMARY KEY (`typeID`);

--
-- Indexes for table `response`
--
ALTER TABLE `response`
  ADD PRIMARY KEY (`responseID`),
  ADD KEY `patientID` (`patientID`);

--
-- Indexes for table `rolePermission`
--
ALTER TABLE `rolePermission`
  ADD PRIMARY KEY (`roleID`),
  ADD KEY `permissionID` (`permissionID`),
  ADD KEY `roleID` (`roleID`);

--
-- Indexes for table `signatureImage`
--
ALTER TABLE `signatureImage`
  ADD PRIMARY KEY (`rowID`),
  ADD KEY `patientID` (`patientID`);

--
-- Indexes for table `userRole`
--
ALTER TABLE `userRole`
  ADD PRIMARY KEY (`roleID`);

--
-- Indexes for table `workingStatus`
--
ALTER TABLE `workingStatus`
  ADD PRIMARY KEY (`statusID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `feedbackQuestion`
--
ALTER TABLE `feedbackQuestion`
  MODIFY `feedbackQuestionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `feedbackResponse`
--
ALTER TABLE `feedbackResponse`
  MODIFY `feedbackID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `nhsUsers`
--
ALTER TABLE `nhsUsers`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `patient`
--
ALTER TABLE `patient`
  MODIFY `patientID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT for table `permission`
--
ALTER TABLE `permission`
  MODIFY `permissionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `question`
--
ALTER TABLE `question`
  MODIFY `questionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `questionType`
--
ALTER TABLE `questionType`
  MODIFY `typeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `response`
--
ALTER TABLE `response`
  MODIFY `responseID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `signatureImage`
--
ALTER TABLE `signatureImage`
  MODIFY `rowID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `userRole`
--
ALTER TABLE `userRole`
  MODIFY `roleID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `workingStatus`
--
ALTER TABLE `workingStatus`
  MODIFY `statusID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `answer`
--
ALTER TABLE `answer`
  ADD CONSTRAINT `answer_ibfk_1` FOREIGN KEY (`patientID`) REFERENCES `patient` (`patientID`),
  ADD CONSTRAINT `answer_ibfk_2` FOREIGN KEY (`questionID`) REFERENCES `question` (`questionID`),
  ADD CONSTRAINT `answer_ibfk_3` FOREIGN KEY (`responseID`) REFERENCES `response` (`responseID`);

--
-- Constraints for table `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`patientID`) REFERENCES `patient` (`patientID`),
  ADD CONSTRAINT `feedback_ibfk_2` FOREIGN KEY (`feedbackQuestionID`) REFERENCES `feedbackQuestion` (`feedbackQuestionID`),
  ADD CONSTRAINT `feedback_ibfk_3` FOREIGN KEY (`feedbackID`) REFERENCES `feedbackResponse` (`feedbackID`);

--
-- Constraints for table `feedbackResponse`
--
ALTER TABLE `feedbackResponse`
  ADD CONSTRAINT `feedbackresponse_ibfk_1` FOREIGN KEY (`patientID`) REFERENCES `patient` (`patientID`);

--
-- Constraints for table `nhsUsers`
--
ALTER TABLE `nhsUsers`
  ADD CONSTRAINT `nhsusers_ibfk_1` FOREIGN KEY (`statusID`) REFERENCES `workingStatus` (`statusID`),
  ADD CONSTRAINT `nhsusers_ibfk_2` FOREIGN KEY (`userRoleID`) REFERENCES `userRole` (`roleID`);

--
-- Constraints for table `question`
--
ALTER TABLE `question`
  ADD CONSTRAINT `question_ibfk_1` FOREIGN KEY (`type`) REFERENCES `questionType` (`typeID`);

--
-- Constraints for table `response`
--
ALTER TABLE `response`
  ADD CONSTRAINT `response_ibfk_1` FOREIGN KEY (`patientID`) REFERENCES `patient` (`patientID`);

--
-- Constraints for table `rolePermission`
--
ALTER TABLE `rolePermission`
  ADD CONSTRAINT `rolepermission_ibfk_1` FOREIGN KEY (`roleID`) REFERENCES `userRole` (`roleID`),
  ADD CONSTRAINT `rolepermission_ibfk_2` FOREIGN KEY (`permissionID`) REFERENCES `permission` (`permissionID`);

--
-- Constraints for table `signatureImage`
--
ALTER TABLE `signatureImage`
  ADD CONSTRAINT `signatureimage_ibfk_1` FOREIGN KEY (`patientID`) REFERENCES `patient` (`patientID`);
