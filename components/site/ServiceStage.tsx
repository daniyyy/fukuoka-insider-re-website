"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { ArrowIcon } from "@/components/site/Icons";

type StageImage = { src: string; width: number; height: number; alt: string };
type StageItem = { title: string; description: string; href: string; image: StageImage };

/**
 * Homepage services: pointing at (or focusing) a service shows that service's photograph
 * on the stage, so the list and the picture read as one piece. Touch devices keep the default photo.
 */
export function ServiceStage({ items, fallback }: { items: StageItem[]; fallback: StageImage }) {
  const [active, setActive] = useState(-1);
  const layers = [fallback, ...items.map((item) => item.image)];

  return (
    <div className="fi-home-services__stage">
      <figure className="fi-home-services__photo">
        {layers.map((image, index) => (
          <Image
            key={image.src}
            className={index - 1 === active ? "is-active" : undefined}
            src={image.src}
            alt={index === 0 ? image.alt : ""}
            aria-hidden={index === 0 ? undefined : true}
            width={image.width}
            height={image.height}
            loading="lazy"
            sizes="(min-width: 1100px) 60vw, 100vw"
          />
        ))}
      </figure>
      <ul className="fi-service-list" onMouseLeave={() => setActive(-1)}>
        {items.map((item, index) => (
          <li key={item.title}>
            <Link className="fi-service-row" href={item.href} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onBlur={() => setActive(-1)}>
              <div className="fi-service-row__text">
                <h3 className="fi-h3">{item.title}</h3>
                <p className="fi-service-row__desc">{item.description}</p>
              </div>
              <span className="fi-service-row__arrow" aria-hidden="true"><ArrowIcon /></span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
