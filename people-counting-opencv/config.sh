NAME="Walmart"
ADDRESS="26471 Carl Boyer Dr, Santa Clarita, CA 91350"
LATITUDE="34.414104"
LONGITUDE="-118.506172"
SQUAREFEET="180000"
ID="zM2VudPVKy6YiQWiFmx3"

python people_counter.py \
	--prototxt mobilenet_ssd/MobileNetSSD_deploy.prototxt \
	--model mobilenet_ssd/MobileNetSSD_deploy.caffemodel \
	--input videos/example_01.mp4 \
	--output output/output_01.avi \
	--name $NAME \
	--address $ADDRESS \
	--latitude $LATITUDE \
	--longitude $LONGITUDE \
	--squarefeet $SQAUREFEET \
	--id $ID
