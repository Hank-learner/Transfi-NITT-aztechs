from imutils.video import VideoStream
import imutils
import time
import cv2
import os

detector = cv2.CascadeClassifier("base-models/haarcascade_frontalface_default.xml")
person = int(input("Enter the rollno of the person: "))
os.mkdir('dataset/' + str(person))
print("[INFO] starting video stream...")
vs = VideoStream(src=0).start()

time.sleep(2.0)
total = 0

while True:
    print("[INFO] Frame read!")
    frame = vs.read()
    orig = frame.copy()
    frame = imutils.resize(frame, width=320)

    rects = detector.detectMultiScale(
        cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY), scaleFactor=1.1,
        minNeighbors=5, minSize=(30, 30))

    for (x, y, w, h) in rects:
        cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
        cv2.imshow("Frame", frame)
        key = cv2.waitKey(1) & 0xFF

    # if the `k` key was pressed, write the *original* frame to disk
    # so we can later process it and use it for face recognition
    if key != ord("q"):
        p = os.path.sep.join(["dataset/{}", "{}.png".format(
            person,
            str(total).zfill(5))])
        cv2.imwrite(p, orig)
        total += 1
    # if the `q` key was pressed, break from the loop
    elif key == ord("q"):
        break
print("[INFO] {} face images stored".format(total))
print("[INFO] cleaning up...")
cv2.destroyAllWindows()
vs.stop()
